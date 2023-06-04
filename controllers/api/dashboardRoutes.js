const router = require('express').Router();
//const { where } = require('sequelize');
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all posts speciffic user (WORKS)
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name',],
        },
      ],
      where: {
        user_id: 1,
      },
    });

        res.status(200).json(postData);

    //    Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    //    Pass serialized data and session flag into template
    res.render('dashboard', {
      posts,
      //logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
