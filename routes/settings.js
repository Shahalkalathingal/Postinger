const isAuth = require('../middlewares/auth')
const router = require('express').Router()
const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const Comment = require('../models/CommentModel')
const Like = require('../models/LikeModel')
const Deleted = require('../models/admin-deleted')

router.post('/privacy',isAuth,async(req,res)=>{
    try {
        const privacy = await User.findById(req.user)

       res.json({privacy:privacy.privacy})
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.post('/Setprivate',isAuth,async(req,res)=>{
    try {
        await User.updateOne({_id:req.user},{
            $set:{
                privacy:1
            }
        })

       res.json({success:true})
    } catch (error) {
        res.status(500).json({ err: error.message,success:false })
    }
})

router.post('/SetPublic',isAuth,async(req,res)=>{
    try {
        await User.updateOne({_id:req.user},{
            $set:{
                privacy:0
            }
        })

       res.json({success:true})
    } catch (error) {
        res.status(500).json({ err: error.message,success:false })
    }
})

router.post('/deleteAcc',isAuth,async(req,res)=>{
    try {
        if(!req.body.why){
            return res.status(400).json({msg:"please add all fields"})
        }
        const {why} = req.body


        

    await Deleted.create({
        user:req.user,
        why,
    })

    await User.updateOne({_id:req.user},{
        $set:{
            deleted:true
        }
    })

    await Post.updateOne({user:req.user},{
        $set:{
            deleted:true
        }
    })


       res.json({success:true})
    } catch (error) {
        res.status(500).json({ err: error.message,success:false })
    }
})



module.exports = router

