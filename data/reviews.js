import { users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';
import { reviews } from "../config/mongoCollections.js";

const exportedFunctions = {

   async createReview(
        userId,
        property_id,
        bookingId,
        reviewText,
        ratings,
    ){
     //validations here

     let newReview={
        userId: new ObjectId(userId),
        property_id: new ObjectId(property_id),
        bookingId: new ObjectId(bookingId), 
        reviewText: reviewText,
        ratings: ratings,
      };
     
      const reviewCollection=await reviews();
      const newInsertInformation=await reviewCollection.insertOne(newReview);
      if(!newInsertInformation.insertedId) throw "Insert Failed";
      return await this.getReviewById(newInsertInformation.insertedId.toString());
    },
    
    async getPropertyReviews(prop_id){
      const reviewCollection=await reviews();
      const reviewList=await reviewCollection.find({property_id:new ObjectId(prop_id)}).toArray();
      return reviewList;
  },
    
    async getReviewById(id){
        id=validation.checkId(id);
        console.log(id);
        const reviewCollection= await reviews();
        console.log(reviewCollection);
        const reviewOne=await reviewCollection.findOne({_id:new ObjectId(id)});
        console.log(reviewOne);
        if(!reviewOne) throw "Review Not Found error";
        return reviewOne;
    },
    
    async removeReviewById(id){
        id=validation.checkId(id);
        const reviewCollection=await reviews();
        const deletionInfo=await reviewCollection.findOneAndDelete({
          _id:new ObjectId(id)
        });
        if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete Review with ${id}`];
  
        return {...deletionInfo.value,deleted:true};
    },
    
    async updateReviewPut(
        id,
        reviewText,
        ratings,
    ){
        id=validation.checkId(id);
        //write validation functions here
        
        const reviewUpdatedInfo={
         reviewText:reviewText,
         ratings:ratings
        };
  
        const reviewCollection=await reviews();
        const updatedInfo=await reviewCollection.findOneAndUpdate(
          {_id:ObjectId(id)},
          {$set:reviewUpdatedInfo},
          {returnDocument:'after'}
        );
        if(updatedInfo.lastErrorObject.n===0){
          throw [404,`Error: Updation failed could not find user with that specific id`];
        }
        return await updatedInfo.value;
    },
    async updateReviewPatch(
        id,
        reviewInfo
    ){
        id=validation.checkId(id);
        
        //validation functions here

        const reviewCollection=await reviews();
        const updatedInfo=await reviewCollection.findOneAndUpdate(
          {_id:new ObjectId(id)},
          {$set:updatedInfo},
          {returnDocument:'after'}
        );
        if(updatedInfo.lastErrorObject.n===0){
          throw [404,`Error: update failed could not find user with this ${id}`];
        }
  
        return await updatedInfo.value;
    }
    
    }
    
    export default exportedFunctions;