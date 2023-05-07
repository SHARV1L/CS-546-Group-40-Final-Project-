import { property, users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';
import { booking } from "../config/mongoCollections.js";
import helpers from "../helper.js";
const exportedFunctions = {

 async createBooking(
    userId,
    property_id,
    checkInDate,
    checkOutDate,
    totalPrice
){
    // userId=validation.checkId(userId);
    // const userCollection=await users();
    // const userList=await userCollection.find({}).toArray();

    // if(userList.some(obj => obj._id === userId)) throw "userid is not present for the property";
    
    
    let newBooking={
     userId:new ObjectId(userId),
     property_id:new ObjectId(property_id),
     checkInDate:checkInDate,
     checkOutDate:checkOutDate,
     totalPrice:totalPrice
    };

     const bookingCollection=await booking();
      const newInsertInformation=await bookingCollection.insertOne(newBooking);
      if(!newInsertInformation.insertedId) throw "Insert Failed";
      else{
      //updating the property availability once booking is done;
      
      const propertyCollection = await property();
      let dates = await helpers.getDatesInRange(new Date(checkInDate),new Date(checkOutDate));
      console.log(dates);
      const updatedProperty = await propertyCollection.findOneAndUpdate({_id:new ObjectId(property_id)},{$push:{availability:{$each:dates}}});
      if(!updatedProperty){
        throw "Update Failed";
      }
      else
      {return await this.getBookingById(newInsertInformation.insertedId.toString())};
    }


},

async getAllBookings(){
    const bookingCollection=await booking();
    const bookingList=await bookingCollection.find({}).toArray();
    return bookingList;
},

async getBookingById(id){
    id=validation.checkId(id);
    //console.log(id);
    const bookingCollection= await booking();
    //console.log(bookingCollection);
    const bookingOne=await bookingCollection.findOne({_id:new ObjectId(id)});
    //console.log(bookingOne);
    if(!bookingOne) throw "Booking Not Found error";
    return bookingOne;
},

async removeBookingById(id){
    id=validation.checkId(id);
    const bookingCollection=await booking();
    const deletionInfo=await bookingCollection.findOneAndDelete({
      _id:new ObjectId(id)
    });
    if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete user with ${id}`];

    return {...deletionInfo.value,deleted:true};
},

async updateBookingPut(
    bookingId,
    userId,
    //property_id,
    //user_id,
    checkInDate,
    checkOutDate,
    totalPrice
){
bookingId=validation.checkId(bookingId);
userId=validation.checkId(userId);

const updatedBookingInfo={
    checkInDate,
    checkOutDate,
    totalPrice
};
const bookingCollection=await booking();
const updatedInfo=await bookingCollection.findOneAndUpdate(
  {bookingId:ObjectId(bookingId)},
  {userId:bookingCollection.userId},
  {$set:updatedBookingInfo},
  {returnDocument:'after'}
);
if(updatedInfo.lastErrorObject.n===0){
  throw [404,`Error: Updation failed could not find user with that specific id`];
}
return await updatedInfo.value;


},

async updateBookingPatch(id,userInfo){
    id=validation.checkId(id);
    //validation functions here
    
     const bookingCollection=await booking();
     const updatedInfo=await bookingCollection.findOneAndUpdate(
       {_id:new ObjectId(id)},
       {$set:userInfo},
       {returnDocument:'after'}
     );
     if(updatedInfo.lastErrorObject.n===0){
       throw [404,`Error: update failed could not find user with this ${id}`];
     }

     return await updatedInfo.value;
   }


}

export default exportedFunctions;