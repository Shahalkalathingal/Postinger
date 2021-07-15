const isAuth = require('../middlewares/auth')
const router = require('express').Router()

const Follow = require('../models/FollowersModel')


router.post('/count', async (req, res) => {
    try {
        const followers = await Follow.find({ userTo: req.body.userTo }).populate('userFrom','name username followers date _id image privacy').populate('userTo','name username followers date _id image privacy deleted isAdmin')
        res.json({ followers,success:true })
    } catch (error) {
        res.status(500).json({ err: error.message ,success:false})

    }
})


router.post('/followed', async (req, res) => {
    try {
        const followed = await Follow.find({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        if (followed.length != 0) {
            return res.json({ followed: true })
        } else {
            return res.json({ followed: false })
        }

    } catch (error) {
        res.status(500).json({ err: error.message })

    }
})




router.post('/follow', isAuth, async (req, res) => {
    try {
        const Check = await Follow.findOne({
            userTo: req.body.userTo,
            userFrom: req.user
        })

        if(Check != null){
            return res.json({success:false})
        }


        if(req.body.userTo === req.user){
            return res.json({success:false})
        }

        await Follow.create({
            userTo: req.body.userTo,
            userFrom: req.user
        })
        res.json({ success: true })

    } catch (error) {
        res.status(500).json({ err: error.message, success: false })

    }
})



router.post('/unFollow', isAuth, async (req, res) => {
    try {
        await Follow.findOneAndRemove({ userTo: req.body.userTo, userFrom: req.user })
        res.json({ success: true })

    } catch (error) {
        res.status(500).json({ err: error.message, success: false })

    }
})

router.post('/getFollowings',async(req,res)=>{
    try {
        const followings = await Follow.find({userFrom:req.body.userId}).populate('userTo','name username followers date _id image privacy isAdmin')
        res.json({ success: true,followings:followings })

    } catch (error) {
        res.status(500).json({ err: error.message, success: false })

    }
})


module.exports = router



