const mongoose = require('mongoose')


const FollowSchema = new mongoose.Schema({
    userTo:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    userFrom:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

},
    { collection: 'followers', timestamps: true }
)

const model = mongoose.model('followers', FollowSchema)



module.exports = model