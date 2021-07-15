const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    file:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    deleted:{
        type:Boolean,
        required:true,
        default:false
      }

   
},
{collection:'posts',timestamps:true}
)

const model = mongoose.model('post',PostSchema)



module.exports = model