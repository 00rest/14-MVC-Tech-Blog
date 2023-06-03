const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data (WORKS WITH INSOMNIA)
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name', ],
        },
        {
          model: Comment,
          attributes: ['user_id', 'date_created', 'comment' ],
          include: [
            {
            model: User,
            attributes: ['user_name', ],
          }
        ]
        },

      ],
    });

 //    res.status(200).json(postData);

//    Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

//    Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      //logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Comment on a post withAuth (WORKS WITH INSOMNIA)
router.post('/dashboard', async (req, res) => {
  try {
    console.log(req.body);
    Comment.create(req.body)
    .then((result) => res.status(200).json(result))
  
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
