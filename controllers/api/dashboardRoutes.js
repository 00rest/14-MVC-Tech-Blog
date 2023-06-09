const router = require('express').Router();
const { where } = require('sequelize');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//Creste new post (WORKS)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update existing post (WORKS)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {...req.body}, 
      {where: {post_id: req.params.id}});

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});


//Delete existing post (WORKS)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { post_id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
