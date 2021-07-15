const isAuth = require('../middlewares/auth')
const router = require('express').Router()

const Like = require('../models/LikeModel')


router.post('/getLikes',async(req,res)=>{
    try {
        let reqBody = {}
        if(req.body.postId){
            reqBody = {postId:req.body.postId}
        }else{
            reqBody = {commentId:req.body.commentId}
        }


        const likes = await Like.find(reqBody)
        res.json({likes})

    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})



router.post('/upLike',isAuth,async(req,res)=>{
    try {
        let reqBody = {}
        let check
        if(req.body.postId){
            reqBody = {postId:req.body.postId,userId:req.user}
            check = await Like.findOne(reqBody)
        }else{
            reqBody = {commentId:req.body.commentId,userId:req.user}
            check = await Like.findOne(reqBody)
        }

        if(check != null){
            return res.status(400).json({msg:"You can only like once"})
        }




        
        //Save like to mongodb
        const NewLike = await Like.create(reqBody)

        res.json({success:true})

        

    } catch (error) {
        res.status(500).json({ err: error.message ,success:false})
    }
})



router.post('/unLike',isAuth,async(req,res)=>{
    try {
        let reqBody = {}
        if(req.body.postId){
            reqBody = {postId:req.body.postId,userId:req.user}
        }else{
            reqBody = {commentId:req.body.commentId,userId:req.user}
        }

        
        const deleteLike = await Like.findOneAndRemove(reqBody)
        res.json({success:true})
        

    } catch (error) {
        res.status(500).json({ err: error.message ,success:false})
    }
})



module.exports = router



