const router = require('express').Router()
// Tools
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Middlewares
const isAuth = require('../middlewares/auth')

// Models
const User = require('../models/UserModel')




/** Register Route */


router.post('/register', async (req, res) => {
    const { name, password, email, con_password, username } = req.body
    try {
        if (!email || !name || !username || !con_password || !password) {
            return res.status(400).json({ msg: "Please add all fields" })
        }

        if (password.length < 8) {
            return res.status(400).json({ msg: "Password need at least 8 characters long" })
        }

        if (password != con_password) {
            return res.status(400).json({ msg: "Passwords do match" })
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(400).json({msg:"Please enter a valid email"})
        }

        const hashed = await bcryptjs.hash(password, 10)

        const NewUser = new User({
            email,
            password: hashed,
            username,
            name,
        })

        NewUser.save(async (err, user) => {
            if (err) {
                if (err.keyPattern.username) {
                    return res.status(400).json({ msg: `username with ${username} is already taken` })
                } else if (err.keyPattern.email) {
                    return res.status(400).json({ msg: `email with ${email} is already taken` })
                } else {
                    return res.status(500).json({ err: err.message })
                }
            }








            const isMatch = await bcryptjs.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: `Invalid password` })
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            res.status(201).json({
                token, user: {
                    name: user.name,
                    username: user.username,
                    followers: user.followers,
                    date: user.date,
                    _id: user._id,
                    image:user.image,
                    privacy:user.privacy,
                    isAdmin:user.isAdmin
                }
            })
        })


        
        }catch{

            return res.status(400).json({ msg: error.message })
        
    }

})


/** Login Route */

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Please add all fields" })
        }
       
       

        const user = await User.findOne({ email: email,deleted:false })

        if (user === null) {
            const username = await User.findOne({ username: email,deleted:false })
            if (username === null) {
                return res.status(400).json({ msg: "User not found" })
            }

            const isMatch = await bcryptjs.compare(password, username.password)
            if (!isMatch) {
                return res.status(400).json({ msg: `Invalid password` })
            }

           

            const token = jwt.sign({ id: username._id }, process.env.JWT_SECRET)

            res.status(201).json({
                token, user: {
                    name: username.name,
                    username: username.username,
                    followers: username.followers,
                    date: username.date,
                    _id: username._id,
                    image: username.image,
                    privacy:username.privacy,
                    isAdmin:username.isAdmin
                }
            })
        } else {
            const isMatch = await bcryptjs.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: `Invalid password` })
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            res.status(201).json({
                token, user: {
                    name: user.name,
                    username: user.username,
                    followers: user.followers,
                    date: user.date,
                    _id: user._id,
                    image:user.image,
                    privacy:user.privacy,
                    isAdmin:user.isAdmin
                }
            })
        }



    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})




/** Token is Valid or not */
router.post('/checkToken', async (req, res) => {
    try {
        const token = req.header('SHAHAL-USER_TOKEN')
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false)

        const user = await User.findOne({_id:verified.id,deleted:false})
        if (!user) return res.json(false)

        return res.json(true)

    } catch (error) {
        if (error.message === 'jwt malformed') {
            return res.status(400).json({ msg: "Your token is Invalid" })
        }
        res.status(500).json({ error: error.message })
    }
})


/** GET user's Data */
router.get('/user', isAuth, async (req, res) => {
    const user = await User.findOne({_id:req.user,deleted:false})
    res.status(200).json({
        user: {
            name: user.name,
            username: user.username,
            followers: user.followers,
            date: user.date,
            _id: user._id,
            image:user.image,
            privacy:user.privacy,
            isAdmin:user.isAdmin
        }
    })
})


module.exports = router