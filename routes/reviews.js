import {Router} from 'express';

const router = Router();

import {usersData} from '../data/index.js';
import { reviewsData } from '../data/index.js';
import validation from '../validation.js';
import { ObjectId } from 'mongodb';
import bookingData from '../data/bookings.js';
//import {exportedFunctions} from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let booking  = await bookingData.getBookingById(req.query.bookingId);  
      res.render('components/review', {title: 'Review Section', bookingInfo: booking,user:req.session.user});
     
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let reviewInfo = req.body;
    console.log("Review Info", reviewInfo);
    try {
      if (reviewInfo || Object.keys(reviewInfo).length > 0){
      const newReview = await reviewsData.createReview(
        req.session.user.id,
        //reviewInfo.userId,
        reviewInfo.property_id,
        reviewInfo.bookingId,
        reviewInfo.reviewText,
        reviewInfo.ratings,
      );
      let updatedBooking =  await bookingData.updateReviewOnBooking(reviewInfo.bookingId,newReview._id);
      console.log("New Review Information", newReview);
     
      res.render('components/thankyou', {title: 'Review Confirmation Page', review: newReview})
      }
    }
      catch(error) {
        res.render('components/error', {title: error})
      }
  });

  export default router;
// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       let booking  = await bookingData.getBookingById(req.params.id);  
//       res.render('/components/review', {title: 'Review Section',bookingInfo:booking});
//     } catch (e) {
//       res.render('/components/error', {error: 'This is not how we intended to search'});
//     }

//   })
//   .post(async (req, res) => {
//     try {
//     // Validate review data
//     const { rating, review } = req.body;
//     if (!rating || !review) {
//       throw new Error('Missing required fields: rating and/or review');
//     }

//     // Validate ID params
//     const id = validation.checkId(req.params.id, 'ID URL Param');

//     // Add review
//     const newReview = await reviewsData.addReview(id, rating, review);

//     res.status(200).render('/components/thankyou', {title: 'review confirmation'});
//     } catch (error) {
//       res.render('components/error', {error: e.message});
//     }
//   })
