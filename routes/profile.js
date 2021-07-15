const isAuth = require('../middlewares/auth')
const router = require('express').Router()
const User = require('../models/UserModel')
const Post = require('../models/PostModel')


router.get('/getUser/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findOne({_id:id,deleted:false})
        const posts = await Post.find({user:id,deleted:false}).sort('-createdAt')
        res.json({posts,user})
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})







module.exports = router

