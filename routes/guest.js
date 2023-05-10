import {Router} from 'express';
const router = Router();
import {usersData} from '../data/index.js';
import validation from '../validation.js';
import bookingData from '../data/bookings.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let userList = await usersData.getAllUsers();
      res.json(userList);
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        'First Name'
      );
      userInfo.lastName = validation.checkString(
        userInfo.lastName,
        'Last Name'
      );
      userInfo.email=validation.checkValidEmail(userInfo.email,"email");
      userInfo.password=validation.checkValidPassword(userInfo.password,"passwd");
      userInfo.phoneNumber=validation.checkValidPhone(userInfo.phoneNumber,"phone");
    } 
    catch (e) {
      return res.status(400).json({error: e});
    }
    try { 
      const newUser = await usersData.createUser(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        userInfo.password,
        userInfo.phoneNumber,
        // userInfo.accountType
      );
      res.json(newUser);
    } catch (e) {
      res.status(500).send("Error creating user");

    }
  });

  router
  .route('/dashboard')
  .get(async (req,res) => {
    try {
    // const userCollection = await guest();
    const user = req.session.user;
    const profilePictureBase64 = user.profilePicture ? user.profilePicture.toString('base64') : null;
    res.render('components/guestHomepage',{title: 'Guest Dashboard Page',user: req.session.user});
    } catch(error) {
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })
  .post(async(req,res)=>{
    try{
      let {selected_option}=req.body;

       if(selected_option=="user_personal"){
         res.redirect('/guest/personal');
       }
       else if(selected_option=="bookings")
       {
        res.redirect('/guest/bookings');
       }
      
      else if(selected_option=="search")
      {
        res.redirect('/search');
      }
    }
    catch(error){
      console.log(error);
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })
  
router
  .route('/personal')
  .get(async(req,res)=>{
    res.render('components/personal-details',{title:'Personal Details',user:req.session.user});
  })
  .post(async(req,res)=>{
    console.log("req.body:",req.body);
  });

  router
  .route('/bookings')
  .get(async(req,res)=>{
    //fetch data from db for list of past bookings for current user
    let bookings = await bookingData.getBookingsByUserId(req.session.user.id);
    console.log(bookings);
    res.render('components/pastBookings', {title:'Guest Bookings', user: req.session.user,bookings:bookings});
  }).
  post(async(req,res)=>{
    console.log("req.body:", req.body);
    //define logic to update the user details
  });

export default router;