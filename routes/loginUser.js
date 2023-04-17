import {Router} from 'express';

const router = Router

// http://localhost:3000/booking
router.route('/login').post(async (req, res) => {
  //code here for GET
  try {
    res.render('components/login', {title: 'Login Page'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// http://localhost:3000/user-pref
router.route('/login/user-pref').post(async (req, res) => {
    //code here for GET
    try {
      res.render('components/afterLogin', {title: 'After Login Page'});
    } catch (error) {
      res.status(400).json({error: e});
    }
  });

// http://localhost:3000/booking
router.route('/sign-up').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/signUp', {title: 'Sign Up Page'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});




export default router;