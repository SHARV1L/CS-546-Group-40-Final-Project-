import {Router} from 'express';
import validation from '../validation.js';
import userMethods from '../data/users.js';
import { property } from "../config/mongoCollections.js";
import { propertyData } from '../data/index.js';
import {usersData} from '../data/index.js';

const router = Router();

// http://localhost:3000/
router
  .route('/')
  .get(async (req, res) => {
      //code here for GET
      try {
        res.render('components/landingPage', {title: 'Landing Page'});
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
      
      // so that user can enter a case sensitive username.
      if(username.toLowerCase() !== user.email.toLowerCase()){
        res.render('components/error', {errorMessage: error})
      }
     
      if (!validationErrors) {
        if(!user) {
          res.render('components/error', {title: 'login credentials cannot be validated, enter again'});
        }
        else {
         
          req.session.user = {id:user.id,firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, accountType: user.accountType, role: user.role}; //// change username to firstName
          if(user.role === "admin") res.redirect('/admin');
          else if(user.role === "user") res.redirect('/user-pref');
          else res.redirect('/user-pref');
        }
      } else res.render('components/login', { title: 'Login Page', errors: validationErrors });
      
    } catch (error) {
      console.log(error);
      res.status(400).json({error: 'Page Not Available'});
    }
});

router.get('/thankYou', (req, res) => {
  res.render('components/thankYou', { title: 'Thank You' });
});


//getting person details 
router.get('/personaldetails', async (req, res) => {
  try {
    console.log('Retrieved session data:', req.session);
    const userId = req.session.user.id;
    console.log(`Retrieved userId from session: ${userId}`);
    console.log(userId);
    let user = await usersData.getUserById(userId);
    console.log(user);
    res.render('components/personal-details', {user});
  } catch (e) {
    console.error(e);
    res.render('components/error', { error: 'Error fetching properties' });
  }
});

//getting person details of host
router.get('/host/personaldetails', async (req, res) => {
  try {
    console.log('Retrieved session data:', req.session);
    const userId = req.session.user.id;
    console.log(`Retrieved userId from session: ${userId}`);
    console.log(userId);
    let user = await usersData.getUserById(userId);
    console.log(user);
    res.render('components/host-personalDetails', {user});
  } catch (e) {
    console.error(e);
    res.render('components/error', { error: 'Error fetching properties' });
  }
});

// post property routes here
router.post('/host/postProperty', async (req, res) => {
  console.log(req.body);
  const {
    propertyName,
    description,
    numberOfRooms,
    numberOfBathrooms,
    amenities,
    address,
    latitude,
    longitude,
    pricePerNight,
    availability,
  } = req.body;
  try{
    if (
      !propertyName ||
      !description ||
      !numberOfRooms ||
      !numberOfBathrooms ||
      !amenities ||
      !address ||
      !latitude ||
      !longitude ||
      !pricePerNight ||
      !availability
    ) {
      return res.status(400).send({ message: 'All fields are required.' });
    }
  
    if (!validation.isValidCoordinates(latitude, longitude)) {
      return res.status(400).send({ message: 'Invalid latitude or longitude.' });
    }
  
    if (isNaN(numberOfRooms) || isNaN(numberOfBathrooms) || isNaN(pricePerNight)) {
      return res.status(400).send({ message: 'Invalid number value(s).' });
    }
  
    if (numberOfRooms <= 0 || numberOfBathrooms <= 0 || pricePerNight <= 0) {
      return res.status(400).send({ message: 'Number values must be greater than zero.' });
    }
  }
  catch(e){
    console.log(e);
  }
  try {
    const newProperty = await propertyData.createProperty(
      req.session.user.id,
      req.body.propertyName,
      req.body.description,
      req.body.numberOfRooms,
      req.body.numberOfBathrooms,
      req.body.amenities,
      req.body.address,
      req.body.latitude,
      req.body.longitude,
      req.body.pricePerNight,
      req.body.availability,
      //req.file
    );
    res.redirect('/thankyou');
  } catch (e) {
    console.log(e);
    res.render('error', { error: 'Error adding property' });
  }
});

//routes of view property
router.get('/host/viewProperty', async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.user.id;
    console.log(userId);
    // if (!userId) {
    //   // If the user is not logged in, redirect to the login page
    //   res.redirect('/login');
    //   return;
    // }

    const propertyCollection = await property();
    const properties = await propertyCollection.find({ userId: userId }).toArray();

    // Render the properties view with the retrieved properties
    res.render('components/viewProperty', { properties });
  } catch (e) {
    console.error(e);
    res.render('error', { error: 'Error fetching properties' });
  }
});


// http://localhost:3000/sign-router
router.route('/sign-up')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('components/signUp', {title: 'Sign Up Page'});
    } catch (error) {
      res.status(400).json({error: error});
    }
  })
  .post(async (req, res) => {
    //code here for GET
    try {
      const { firstName, lastName, age, email, password, phoneNumber, role } = req.body;
      
      const validationErrors = validation.signup(firstName, lastName, age, email, password, phoneNumber, role);

      if(age<13){
        console.log("line 209");
        res.render('components/error', {errorMessage: "age cannot be less than 13"})
      }

      if (!validationErrors) {    
        console.log("inside if:", req.body);
        let userInfo = req.body;
        //creating new user 
        const user = await userMethods.createUser(
          userInfo.firstName,
          userInfo.lastName,
          userInfo.age,
          userInfo.email,
          userInfo.password,
          userInfo.phoneNumber,
          userInfo.role
        )
      if(user) {
        res.redirect("/login");
        }  
      }
    } 
    catch(error) {
      res.status(400).render('components/error', {errorMessage: 'Server Error, Sign-up Again'});
    }
  });

  // http://localhost:3000/login/user-pref      /////////////// '.get' step is just for checking route - not required
router
.route('/user-pref')
  .get(async (req, res) => {
      //code here for GET
      try {
        res.render('components/afterLogin', {title: 'User Preference Page'})
      } catch (error) {
        res.status(400).json({error: "Cannot redirect to User-Preference Page"});
      }
    })
  .post(async (req, res) => {
    try {
      const buttonVal = req.body.accountType;
      console.log("The Button clickcked is: ", buttonVal , req.session.user);
       
     if(buttonVal === "guest") {
        console.log("inside if user 122", buttonVal);
        
       res.status(200).send({redirectUrl:'/guest/dashboard'});
      } else if (buttonVal === "host") {
       
        res.status(200).json({redirectUrl:'/host/dashboard'});
       
      } else {
        res.status(400).json({ error: 'Invalid button value' });
      }
    } catch (error) {
      res.status(400).json({error: "Didnt find youe homepage, sorry"});
    }
});
    
router
  .route('/error')
  .get(async (req, res) => {
    //code here for GET
    res.render('error', { error: 'Error Page' });
});

router
  .route('/logout')
  .get(async (req, res) => {
  req.session.destroy();
  res.send('Logged out');
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
// -10 for not using seed task.
// -5 for not having suffieceint test data.
// +5 to +15(max) for every extra feature added.
// +15 TA has a complexity bonus.
// potential to get 130 pts in total.
// last semester average for code was 66.
// one user can review only once for a particular property.
// if age < 13 user cannot signup or login.
