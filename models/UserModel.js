const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio:{
      type:String,
      default:''
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: Date.now(),
    },
    image: {
      type: String,
      required: true,
      default:
        "/accountCircle.png",
    },
    privacy:{
      type:Number,
      required:true,
      default:0
    },
    deleted:{
      type:Boolean,
      required:true,
      default:false
    },
    isAdmin:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  { collection: "users", timestamps: true },
);

const model = mongoose.model("user", UserSchema);

module.exports = model;
