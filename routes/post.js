const isAuth = require('../middlewares/auth')
const router = require('express').Router()
const Post = require('../models/PostModel')
const Like = require('../models/LikeModel')
const Comment = require('../models/CommentModel')

router.post('/upload', isAuth, async (req, res) => {
    try {
        const { image, body } = req.body
        if (!body) {
            return res.status(400).json({ msg: "Please enter your description" })
        }

        if (body.length < 7) {
            return res.status(400).json({ msg: "Description must needs atleast 7 characters long" })
        }

        const response = await Post.create({
            file: image,
            user: req.user,
            body
        })
        res.json(response)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})


router.get('/getAll', async (req, res) => {
    try {
        const posts = await Post.find({deleted:false}).sort('-createdAt').populate('user', '_id username name followers date image privacy deleted isAdmin').limit(30)
        res.json(posts)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})



router.get('/getOne/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', '_id username name followers date image privacy deleted isAdmin')
        res.json({ post })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})




router.get('/GetLikes', async (req, res) => {
    try {
        const response = await Like.find({ post: id })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})


router.post('/deleteComment',isAuth,async(req,res)=>{
    try {
        const deleteComment = await Comment.updateOne({_id:req.body.commentId},{
            $set:{
                deleted:true
            }
        })
        res.json({success:true})
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})


router.post('/deletePost',isAuth,async(req,res)=>{
    try {
        const check = await Post.findOne({user:req.body.userId,_id:req.body._id,deleted:false})
        if(check != null){

            await Post.updateOne({_id:req.body._id},{
                $set:{
                    deleted:true
                }
            })
            
            return res.json({success:true})
        }
        return res.status(400).json({msg:"Shahal, You can only delete your posts"})
    } catch (error) {
        res.status(500).json({ err: error.message ,success:false})
    }
})

router.post('/saveComment', isAuth, async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).json({ msg: "Please add your comment field" })
        }
     
            const Newcomment = await Comment.create({
                writer: req.user,
                postId: req.body.postId,
                content: req.body.content
            })
            const comment = await Comment.find({ _id: Newcomment._id })
                .populate('writer', 'name username followers date _id image privacy deleted isAdmin')

            res.status(201).json({ comment })
        




    } catch (error) {
        res.status(400).json({ err: error.message })
    }

})



router.get('/getComments/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Comments = await Comment.find({ postId: id }).populate('writer', 'name username followers date _id image isAdmin privacy').sort('-updatedAt')
        res.json({ comments: Comments })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }

})





module.exports = router