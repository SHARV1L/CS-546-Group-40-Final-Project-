import { users } from "../config/mongoCollections.js";
import { property } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';
import userData from "./users.js";

//import { createUser, getAllUsers, removeUser, updateUserPatch, updateUserPut } from '../data/users.js';

let exportedFunctions={

    async createProperty(
        //userId,
        userId,
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
    ){
        //userId=validation.checkId(userId);
        //const userCollection=await users();
        //const userList=await userCollection.find({}).toArray();

        //if(userList.some(obj => obj._id === userId)) throw "userid is not present for the property";
        
        propertyName=validation.checkString(propertyName);
        description=validation.checkString(description);

        //have to write some other validation functions

        let newProperty={
            userId:userId,  // commented out here
            propertyName:propertyName,
            description:description,
            numberOfRooms:numberOfRooms,
            numberofBathrooms:numberofBathrooms,
            amenities:amenities,
            address:address,
            latitude:latitude,
            longitude:longitude,
            pricePerNight:pricePerNight,
            availability:availability,
            // image: {
            //   data: fs.readFileSync(image.path),
            //   contentType: image.mimetype
            // }
        }


        const propertyCollection=await property();
        const newInsertInformation=await propertyCollection.insertOne(newProperty);
        if(!newInsertInformation.insertedId) throw "Insert Failed";
        return await this.getPropertyById(newInsertInformation.insertedId.toString());


     
    },
    
    async getAllProperty(data){
        console.log("here there ",data);
        const propertyCollection=await property();
        let searchQuery=[];
        if(data.location!==''){
          searchQuery.push({address: `/.*${data.location}.*/i`});
        }
        if(data.price!==''){
          searchQuery.push({pricePerNight:Number(data.price)});
        }
        if(data.availability!==''){
          searchQuery.push({availability:{$nin:data.availability}});
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
        var propertyCollection = await property();

        console.log("teststeststestst")
       
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
       }
    }
    
    export default exportedFunctions;