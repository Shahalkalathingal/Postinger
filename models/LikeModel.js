const mongoose = require('mongoose')


const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    },

},
    { collection: 'likes', timestamps: true }
)

const model = mongoose.model('like', LikeSchema)



module.exports = model