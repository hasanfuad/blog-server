const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(401).json(err);
      }
    } else {
      res.status(401).json("You only can update your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted!");
      } catch (err) {
          res.status(500).json(err);
      }
    } else {
      res.status(401).json("You only can delete your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get post
module.exports = router;
