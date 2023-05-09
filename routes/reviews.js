import {Router} from 'express';

const router = Router();

import {usersData} from '../data/index.js';
import { reviewsData } from '../data/index.js';
import validation from '../validation.js';
import { ObjectId } from 'mongodb';
//import {exportedFunctions} from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      // let reviewList = await reviewsData.getAllReviews();
      // res.json(reviewList);
      res.render('components/review', {title: 'Property Review'})
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
      console.log("New Review Information", newReview);
      res.json(newReview);
      res.render('/components/thankyou', {title: 'Review Confirmation Page'})
      }
      }
      catch {
        res.render('./components/error', {title: error})
      }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      res.render('/components/review', {title: 'Review Section'});
    } catch (e) {
      res.render('/components/error', {error: 'This is not how we intended to search'});
    }
    try {
      //let reviewsData = await review();
      let review = await reviewsData.getReviewById(req.params.id);
      res.json(review);
    } catch (e) {
      res.status(404).json({error: 'Review not found'});
    }
  })
  .post(async (req, res) => {
    try {
    // Validate review data
    const { rating, review } = req.body;
    if (!rating || !review) {
      throw new Error('Missing required fields: rating and/or review');
    }

    // Validate ID params
    const id = validation.checkId(req.params.id, 'ID URL Param');

    // Add review
    const newReview = await reviewsData.addReview(id, rating, review);

    res.status(200).render('/components/thankyou', {title: 'review confirmation'});
    } catch (error) {
      res.render('components/error', {error: e.message});
    }
  })
  .put(async (req, res) => {
    let reviewInfo = req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id);
    //   userInfo.firstName = validation.checkString(
    //     userInfo.firstName,
    //     'First Name'
    //   );
    //   userInfo.lastName = validation.checkString(
    //     userInfo.lastName,
    //     'Last Name'
    //   );
    // write validation functions here
    } catch (e) {
    return res.status(400).json({error: e});
  }

    try {
      const updatedReview = await reviewsData.updateReviewPut(
        req.params.id,
        reviewInfo.reviewText,
        reviewInfo.ratings
      );
      res.json(updatedReview);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  })
  .patch(async (req, res) => {
    let reviewInfo = req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    // try {
    //   req.params.id = validation.checkId(req.params.id);
    //   if (reviewInfo.reviewText) {
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
    //validation functions here

    try {
      const updatedReview = await reviewsData.updateReviewPatch(
        req.params.id,
        reviewInfo
      );
      res.json(updatedReview);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let deletedReview = await reviewsData.removeReviewById(req.params.id);
      res.json(deletedReview);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  });

export default router;