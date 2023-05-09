import {Router} from 'express';
import { booking } from '../config/mongoCollections.js';
import {usersData} from '../data/index.js';
import { propertyData } from '../data/index.js';
import { bookingsData } from '../data/index.js';
import validation from '../validation.js';
//import {exportedFunctions} from '../data/users.js';

const router = Router();
// // get post already done in listings.js

// // http://localhost:3000/booking
// router.route('/bookings').post(async (req, res) => {
//   //code here for GET
//   try {
//     res.render('components/booking', {title: 'Your property'});
//   } catch (error) {
//     res.status(400).json({error: e});
//   }
// });

// // http://localhost:3000/booking/confirmation
router.route('/confirmation').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/confirmation', {title: 'Confirmation'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// // http://localhost:3000/booking/booking-failed
router.route('/bookingFailed').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/error', {title: 'Error Booking'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

//////////////// added from here 
router
  .route('/')
  .get(async (req, res) => {
    try {
      let bookingList = await bookingsData.getAllBookings();
      //res.json(bookingList);
      res.render('/components/booking', {title: 'Booking Page'} )
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let bookingInfo = req.body;
    console.log(bookingInfo);
    try { 
    if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
   // validation functions here
    else{
      
      const newBooking = await bookingsData.createBooking(
        req.session.user.id,
        bookingInfo.property_id,
        bookingInfo.checkInDate,
        bookingInfo.checkOutDate,
        bookingInfo.totalPrice
      );

      res.json({booking:newBooking,redirectUrl:"/booking/confirmation"});
    }
    } catch (e) {
      res.status(500).send("Error creating user");
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let booking = await bookingsData.getBookingById(req.params.id);
      res.json(booking);
    } catch (e) {
      res.status(404).json({ error: 'Booking not found' });
    }
  })
  .put(async (req, res) => {
    let bookingInfo = req.body;
    if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    // try {
    //   req.params.id = validation.checkId(req.params.id);
    //   userInfo.firstName = validation.checkString(
    //     userInfo.firstName,
    //     'First Name'
    //   );
    //   userInfo.lastName = validation.checkString(
    //     userInfo.lastName,
    //     'Last Name'
    //   );
    // } catch (e) {
    //   return res.status(400).json({error: e});
    // }
    // write validation functions here

    try {
      const updatedBooking = await bookingsData.updateBookingPut(
        req.params.id,
        bookingInfo.checkInDate,
        bookingInfo.checkOutDate,
        bookingInfo.totalPrice
      );
      res.json(updatedBooking);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  })
  .patch(async (req, res) => {
    let bookingInfo = req.body;
    if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    // try {
    //   req.params.id = validation.checkId(req.params.id);
    //   if (userInfo.firstName) {
    //     userInfo.firstName = validation.checkString(
    //       userInfo.firstName,
    //       'First Name'
    //     );
    //   }

    //   if (userInfo.lastName) {
    //     userInfo.lastName = validation.checkString(
    //       userInfo.lastName,
    //       'Last Name'
    //     );
    //   }
    // } catch (e) {
    //   return res.status(400).json({error: e});
    // }
    //write validation functions here

    try {
      const updatedBooking = await bookingsData.updateBookingPatch(
        req.params.id,
        userInfo
      );
      res.json(updatedBooking);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let deletedBooking = await bookingsData.removeBookingById(req.params.id);
      res.json(deletedBooking);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  });


export default router;