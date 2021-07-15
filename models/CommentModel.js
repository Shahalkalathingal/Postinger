const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    content: {
        type:String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    deleted:{
        type:Boolean,
        required:true,
        default:false
    }

},
    { collection: 'comments', timestamps: true }
)

const Comment = mongoose.model('comment', CommentSchema)



module.exports = Comment