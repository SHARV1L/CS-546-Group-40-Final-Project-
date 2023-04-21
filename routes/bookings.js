import {Router} from 'express';

const router = Router

// get post already done in listings.js

// http://localhost:3000/booking
router.route('/bookings').post(async (req, res) => {
  //code here for GET
  try {
    res.render('components/booking', {title: 'Your property'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});
i
// http://localhost:3000/booking/confirmation
router.route('/bookings/confirmation').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/confirmation', {title: 'Confirmation'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// http://localhost:3000/booking/booking-failed
router.route('/bookings/bookingFailed').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/error', {title: 'Error Booking'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});





export default router;