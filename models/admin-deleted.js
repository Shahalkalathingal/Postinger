const mongoose = require("mongoose");

const deletedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    deletedDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    why: {
      type: String,
      required: true,
    },
  },
  { collection: "deleted", timestamps: true },
);

const Comment = mongoose.model("admin-deleted", deletedSchema);

module.exports = Comment;
