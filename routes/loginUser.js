import {Router} from 'express';
import validation from '../validation.js';
import userMethods from '../data/users.js';

const router = Router();

// http://localhost:3000/
router
  .route('/')
  .get(async (req, res) => {
      //code here for GET
      try {
        //res.render('components/landingPage', {title: 'Landing Page'});
      } catch (error) {
        res.status(400).json({error: e});
      }
  });

// http://localhost:3000/login
router
.route('/login')
  .get(async (req, res) => {
    //code here for GET
    try {
      console.log("hello");
      res.render('components/login', {title: 'Login Page'});
    } catch (error) {
      res.status(400).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for GET
    try {
      const { username, password } = req.body;
      // validating username and password
      const user = await userMethods.checkUser(username, password);
      const validationErrors = validation.login(username, password);
     
      if (!validationErrors) {
        if(!user) {
          res.redirect('/sign-up');
        }
        else {
          console.log("response inside else");
          req.session.user = {firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email}; //// change username to firstName
          if(user.role === "host") res.redirect('/host');
          else if(user.role === "user") res.redirect('/user');
          else res.redirect('/user-pref');
        }
      } else res.render('components/login', { title: 'Login Page', errors: validationErrors });
      //res.redirect('/login/user-pref');
    } catch (error) {
      console.log(error);
      res.status(400).json({error: 'Page Not Available'});
    }
});

// http://localhost:3000/login/user-pref      /////////////// '.get' step is just for checking route - not required
router
.route('/login/user-pref')
  .get(async (req, res) => {
      //code here for GET
      try {
        res.render('components/afterLogin', {title: 'User Preference Page'})
      } catch (error) {
        res.status(400).json({error: e});
      }
    })
  .post(async (req, res) => {
    try {
      if(user-pref === guest) {
        res.render('components/guestHomepage', {title: 'Guest Homepage'});
      }
      else if (user-pref === hosts) {
        res.render('components/hostHomepage', {title: 'Host Homepage'});
      }
    } catch (error) {
      res.status(400).json({error: e});
    }
});

// http://localhost:3000/sign-up
router
.route('/sign-up')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('components/signUp', {title: 'Sign Up Page'});
    } catch (error) {
      res.status(400).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for GET
    try {
      const { firstName, lastName, email, password, phoneNumber, accountType } = req.body;
      // console.log(req.body);
      const validationErrors = validation.signup(firstName, lastName, email, password, phoneNumber, accountType);

      console.log("validation:", validationErrors);

      console.log("outside if:", req.body);
      if (!validationErrors) {    
        console.log("inside if:", req.body);
        //creating new user 
        const user = await userMethods.createUser(
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          accountType
        )
        console.log("user is:", user);
        if(!user) {
          res.redirect('/login');
        } else res.redirect('/user-pref');
      }
      else res.redirect('/sign-up');
    } 
    catch(error) {
        res.status(400).json(error);
      }
  });
    
router
.route('/user-pref')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('components/afterLogin', {title: 'User Preference Page'});
    } catch (error) {
      res.status(400).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for GET
    try {
      const { email, password } = req.body;
      console.log(username);
      const validationErrors = validation.signup(email, password);
        if (validationErrors) {
          return res.render('components/signUp', { title: 'Sign Up Page', errors: validationErrors });
        }
        res.redirect('/login');
      //res.render('components/signUp', {title: 'Sign Up Page'});
    } catch (error) {
      res.status(400).json({error: 'Sign up error'});
    }
}); 

export default router;

// Final Project Rubrics: -

// -10 if you dont have custom css 
// -5 for minimal css
// -10 if here is no client side input validation *****
// -10 if application is vulnerable to XSS
// -5 for not including node module s and start 
// -2 per field for no invliad or blank or data that doesn't make sense 
// 5 point cap per form
// -2 point per dependency if dependenicies miss
// -5 if a normal user can access the things that admin can access
// -5 in valid html ******
// -2 per page totally issues 6 point cap  ******
// -10 if core feature is not inclded
// -5 if feature doesnt workm as expected 
// -10 if we are able to make same account with username and email address
// sign in as case sesnitive
// -2 to -10 for bug and usability issues
// -10 for not using seed task
// -5 for not having suffieceint test data
// +5 to +15(max) for every extra feature added
// +15 TA has a complexity bonus
// potential to get 130 pts in total
// last semester average for code was 66
// one user can review only once for a particular property.
