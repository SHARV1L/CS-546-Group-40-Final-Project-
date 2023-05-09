import { users } from "../config/mongoCollections.js";
import { property } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';
import userData from "./users.js";
import helpers from "../helper.js";
import axios from "axios";
//import { createUser, getAllUsers, removeUser, updateUserPatch, updateUserPut } from '../data/users.js';

let exportedFunctions={

    async createProperty(
        
        userId,
        propertyName,
        description,
        numberOfRooms,
        numberofBathrooms,
        amenities,
        address,
        pricePerNight
        
    ){
        //userId=validation.checkId(userId);
        //const userCollection=await users();
        //const userList=await userCollection.find({}).toArray();

        //if(userList.some(obj => obj._id === userId)) throw "userid is not present for the property";
        
        propertyName=validation.checkString(propertyName);
        description=validation.checkString(description);
        let latitude='', longitude='';
        //have to write some other validation functions
        //function to fetch lat long values from address
        let gApi = "AIzaSyCNCNRdpbvG1ahzBPfxctc3EfTGFzVL5n8";
        console.log("key",process.env.GOOGLE_API_KEY);
        let targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gApi}`
        // request call with parameters
 let data = await axios(targetUrl).then(async response=>{
    
    let geoLocation = response.data;
    console.log(geoLocation);
    if(geoLocation?.results?.length>0)     
       {
         latitude =geoLocation.results[0].geometry.location.lat;
         longitude=geoLocation.results[0].geometry.location.lng;
         let newProperty={
          userId: new ObjectId(userId),  // commented out here
          propertyName: propertyName,
          description: description,
          numberOfRooms: numberOfRooms,
          numberofBathrooms: numberofBathrooms,
          amenities: amenities,
          address: address,
          latitude: latitude,
          longitude: longitude,
          pricePerNight: pricePerNight,
          availability:[],
          reviews:[]
 
         // image: {
         //   data: fs.readFileSync(image.path),
         //   contentType: image.mimetype
         // }
     }
 
 
     const propertyCollection=await property();
     const newInsertInformation=await propertyCollection.insertOne(newProperty);
     if(!newInsertInformation.insertedId) throw "Insert Failed";
     return await this.getPropertyById(newInsertInformation.insertedId.toString());
      }
       
       else {
         throw "Error Fetching Lat Long Values";
       }
    
   }).catch(err=>{

    return {error:err};
   })
   
   if(data.error){
     throw data.error;
   } 
   else return data;
},
    
    async getAllProperty(data){
        console.log(data);
        const propertyCollection=await property();
        let searchQuery=[];
        if(data.location!==''){
          searchQuery.push({address: `/.*${data.location}.*/i`});
        }
        if(data.price!==''){
          searchQuery.push({pricePerNight:Number(data.price)});
        }
        if(data.checkinDate!==''&&data.checkoutDate!==''){
          console.log('check')
          let dates = await helpers.getDatesInRange(new Date(data.checkinDate),new Date(data.checkoutDate));
          console.log("$:",dates);
          searchQuery.push({availability:{$nin:dates}});
        }
        console.log(searchQuery);
        const propertyList=await propertyCollection.find({$or:searchQuery},{_id:1,name:1}).limit(20).toArray();
        console.log(propertyList.length);
        return propertyList;
    },
    
    async getPropertyById(id){
        //id=validation.checkId(id);
        //console.log(id,"teststeststestst", property);
        try{
        console.log(id);
        const propertyCollection = await property();

        //console.log("teststeststestst")
       
        const propertyOne=await propertyCollection.findOne({_id:new ObjectId(id)});
        
        console.log(propertyOne);
        if(!propertyOne) throw "User Not Found error";
        return propertyOne;
      }
      catch(e){
        console.log(e);
      }
    },
    
    async removePropertyById(id){
        id=validation.checkId(id);
        const propertyCollection=await property();
        const deletionInfo=await propertyCollection.findOneAndDelete({
          _id:new ObjectId(id)
        });
        if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete user with ${id}`];
  
        return {...deletionInfo.value,deleted:true};
    },
    async updatePropertyPut(
        property_id,
        propertyName,
        description,
        numberOfRooms,
        numberofBathrooms,
        amenities,
        address,
        latitude,
        longitude,
        pricePerNight,
        availability
    ) {
      property_id=validation.checkId(property_id);
      //write valiudations here
      
      const propertyUpdatedInfo={
        propertyName,
        description,
        numberOfRooms,
        numberofBathrooms,
        amenities,
        address,
        latitude,
        longitude,
        pricePerNight,
        availability
      };

      const propertyCollection=await property();
      const updatedInfo=await propertyCollection.findOneAndUpdate(
        {property_id:ObjectId(property_id)},
        {userId:propertyCollection.userId},
        {$set:propertyUpdatedInfo},
        {returnDocument:'after'}
      );
      if(updatedInfo.lastErrorObject.n===0){
        throw [404,`Error: Updation failed could not find user with that specific id`];
      }
      return await updatedInfo.value;

    },
    async updatePropertyPatch(property_id,propertyInfo){
        property_id=validation.checkId(property_id);
        if(propertyInfo.propertyName)
           propertyInfo.propertyName=validation.checkString(propertyInfo.propertyName,'property name');
         
          //should write some validation functions

        
         const propertyCollection=await property();
           const updatedInfo=await propertyCollection.findOneAndUpdate(
           {_id:new ObjectId(property_id)},
           {$set:propertyInfo},
           {returnDocument:'after'}
         );
         console.log(updatedInfo.value);
         if(updatedInfo.lastErrorObject.n===0){
           throw [404,`Error: update failed could not find user with this ${id}`];
         }
         console.log(updatedInfo);
   
         return await updatedInfo.value;
       },

       async getPropertyByHostId(id){
        try{
           var propertyCollection = await property();
           const propertyList=await propertyCollection.find({userId:new ObjectId(id)}).toArray();
           if(!propertyList) throw "Property Not Found error";
           return propertyList;
         }
         catch(e){
           console.log(e);
         }
       }
    }
    
    export default exportedFunctions;