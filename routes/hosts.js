import {Router} from 'express';
const router = Router();
import {hostsData} from '../data/index.js';
import validation from '../validation.js';
import { property } from "../config/mongoCollections.js";
import { propertyData } from '../data/index.js';
//import {exportedFunctions} from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let hostList = await hostsData.getAllHosts();
      res.json(hostList).render('components/hostHomePage', {title: 'Host Home Page'});
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let hostInfo = req.body;
    if (!hostInfo || Object.keys(hostInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      hostInfo.firstName = validation.checkString(
        hostInfo.firstName,
        'First Name'
      );
      hostInfo.lastName = validation.checkString(
        hostInfo.lastName,
        'Last Name'
      );
      hostInfo.email=validation.checkValidEmail(hostInfo.email,"email");
      hostInfo.password=validation.checkValidPassword(hostInfo.password,"passwd");
      hostInfo.phoneNumber=validation.checkValidPhone(hostInfo.phoneNumber,"phone");
      hostInfo.accountType=validation.checkString(hostInfo.accountType,"accountType");

    } catch (e) {
      return res.status(400).json({error: e});
    }
    try { 
      const newHost = await hostsData.createHost(
        hostInfo.firstName,
        hostInfo.lastName,
        hostInfo.email,
        hostInfo.password,
        hostInfo.phoneNumber,
        hostInfo.accountType
      );
      res.json(newHost);
    } catch (e) {
      res.status(500).send("Error creating host");

    }
  });

  router
  .route('/dashboard')
  .get(async (req,res) => {
    try {
    
    console.log("in host dash");
    res.render('components/hostHomepage',{title: 'Host Dashboard Page',user: req.session.user});
    } catch(error) {
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })
  .post(async(req,res)=>{
    try{
      let {selected_option}=req.body;
       if(selected_option=="user_personal"){
         res.redirect('/host/personal');
       }
       else if(selected_option=="past_bookings")
       {
        res.redirect('/host/past_bookings');
       }
      else if(selected_option=="upcoming_bookings")
      {
        res.redirect('/host/upcoming_bookings');
      }
      else if(selected_option=="post_property"){
        res.redirect('/host/post_property');
      }
      else if(selected_option=="view_property")
      {
        res.redirect('/host/view_property');
      }
      
    }
    catch(error){
      res.status(400).json({error: 'could not find the user, try again'})
    }
  })

  router.route('/personal').get(async(req,res)=>{
    res.render('components/personal-details',{title:'Personal Details',user:req.session.user});
  }).post(async(req,res)=>{
    console.log("req.body:",req.body);
    //define logic to update the user details
  });

  router.route('/bookings').get(async(req,res)=>{
    console.log("in host bookings");
    //fetch data from db for list of past bookings for current user
    let bookingList = await hostsData.getBookingsByHostId(req.session.user.id);
    //let bookingList = await hostsData.getBookingsByHostId(req.query.userId);
    res.render('components/pastBookings',{title:'Bookings',user:req.session.user,bookings:bookingList});
  }).post(async(req,res)=>{
    console.log("req.body:",req.body);
    //define logic to update the user details
  });

  router.route('/post_property').get(async(req,res)=>{
    
    res.render('components/postProperty', { title: 'postProperty' });
  }).post(async(req,res)=>{
    console.log("req.body host:",req.body);
    try {
      const newProperty = await propertyData.createProperty(
        //req.session.user.id,
        req.body.userId,
        req.body.propertyName,
        req.body.description,
        req.body.numberOfRooms,
        req.body.numberOfBathrooms,
        req.body.amenities,
        req.body.address,
        req.body.pricePerNight,
        
        //req.file
      );
      if(newProperty)
      {
        res.redirect('/host/thankyou')
      };
    } catch (e) {
      console.log("$$$",e);
      res.render('components/error', { errorMessage: 'Error adding property' });
    }
    //define logic to add the property
  });
  router.route('/view_property').get(async(req,res)=>{
    //fetch data from db for list of past bookings for current user
    try {
      // Retrieve the user ID from the session
      const userId = req.session.user.id;
      console.log(typeof(userId));

      let properties = await propertyData.getPropertyByHostId(userId);
      // Render the properties view with the retrieved properties
      res.render('components/viewProperty', { properties:properties });
    } catch (e) {
      console.error(e);
      res.render('error', { error: 'Error fetching properties' });
    }
    
  });

  router
  .route('/thankyou')
  .get(async (req, res) => {
    try {
      res.status(200).render('components/hostThankYou', {user: req.session.user});
    } catch (error) {
      res.render('components/error', {errorMessage: error});
    }
  })
export default router;