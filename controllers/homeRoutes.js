const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts and JOIN with user data (WORKS)
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name',],
        },
        {
          model: Comment,
          attributes: ['user_id', 'date_created', 'comment'],
          include: [
            {
              model: User,
              attributes: ['user_name',],
            }
          ]
        },

      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Comment on a post (WORKS)
router.post('/comment/:id', withAuth, async (req, res) => {
  try {
    //console.log(req.session.user_id);
    Comment.create({ post_id: req.params.id, ...req.body, user_id: req.session.user_id })
      .then((result) => res.status(200).json(result))

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// Get all posts speciffic user and render homepage (WORKS)
router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session.user_name);
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name',],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name
    });
  }
  catch (err) { res.status(500).json(err) }
});

// Login rediretion (WORKS)
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
