const isAuth = require("../middlewares/auth");
const router = require("express").Router();
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken')

router.post("/update", isAuth, async (req, res) => {
  try {
    const { image, name, username, bio, email, _id } = req.body;
    if (req.user !== _id) {
      return res.status(400).json({ msg: "You can only update your profile" });
    }
    if (!email || !name || !username) {
      return res.status(400).json({ msg: "email,username and name is must" });
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    await User.updateOne(
      { _id },
      {
        $set: {
          image,
          name,
          username,
          bio,
          email,
        },
      },
    );
    const user = await User.findOne({_id,deleted:false});
    res.status(201).json({
      user: {
        name: user.name,
        username: user.username,
        followers: user.followers,
        date: user.date,
        _id: user._id,
        image: user.image,
        privacy: user.privacy,
        isAdmin:user.isAdmin
      },
    });
  } catch (error) {
    res.status(500).json({ err: error.message, success: false });
  }
});

module.exports = router;
