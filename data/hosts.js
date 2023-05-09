import { hosts, booking } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';
import propertyData from "./properties.js";

const exportedFunctions = {

    async createHost(
        //id,
        //propertyIds,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        accountType
    ){
     firstName=validation.checkString(firstName,'First Name');
     lastName=validation.checkString(lastName,'Last Name');
     email=validation.checkValidEmail(email,'Email Name');
     password=validation.checkValidPassword(password,'password1');
     phoneNumber=validation.checkValidPhone(phoneNumber,'Phone Number');
     //profilePicture=validation.checkValidProfilePicture(profilePicture,Profile1);
     accountType=validation.checkString(accountType,"Account Type");
     //console.log(firstName);

     

     let newHost={
       firstName:firstName,
       lastName:lastName,
       email:email,
       password:password,
       phoneNumber:phoneNumber,
       //profilePicture:profilePicture,
       accountType:accountType
     };
    
  
     const hostCollection=await hosts();
     const newInsertInformation=await hostCollection.insertOne(newHost);
     if(!newInsertInformation.insertedId) throw "Insert Failed";
     return await this.getHostById(newInsertInformation.insertedId.toString());
    },
    
    async getAllHosts(){
        const hostCollection=await hosts();
        const hostList=await hostCollection.find({}).toArray();
        return hostList;
    },
    
    async getHostById(id){
        id=validation.checkId(id);
        console.log(id);
        const hostCollection= await hosts();
        console.log(hostCollection);
        const host=await hostCollection.findOne({_id:new ObjectId(id)});
        console.log(host);
        if(!host) throw "Host Not Found error";
        return host;
    },
    
    async removeHostById(id){
        id=validation.checkId(id);
        const hostCollection=await hosts();
        const deletionInfo=await hostCollection.findOneAndDelete({
          _id:new ObjectId(id)
        });
        if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete host with ${id}`];
  
        return {...deletionInfo.value,deleted:true};
    },
    
    async updateHostByPut(
        id,
        firstName,
        lastName 
    ){
        id=validation.checkId(id);
        firstName=validation.checkString(firstName,'first name');
        lastName=validation.checkString(lastName,'last name');
        
        const hostUpdatedInfo={
         firstName:firstName,
         lastName:lastName
        };
  
        const hostCollection=await hosts();
        const updatedInfo=await hostCollection.findOneAndUpdate(
          {_id:ObjectId(id)},
          {$set:hostUpdatedInfo},
          {returnDocument:'after'}
        );
        if(updatedInfo.lastErrorObject.n===0){
          throw [404,`Error: Updation failed could not find user with that specific id`];
        }
        return await updatedInfo.value;
    },

    async updateHostByPatch(
       id,
       hostInfo
    ){
        id=validation.checkId(id);
        if(hostInfo.firstName)
           hostInfo.firstName=validation.checkString(hostInfo.firstName,'first name');
         
        if(hostInfo.lastName)
           hostInfo.lastName=validation.checkString(hostInfo.lastName,'last name');
        
         const hostCollection=await hosts();
         const updatedInfo=await hostCollection.findOneAndUpdate(
           {_id:new ObjectId(id)},
           {$set:hostInfo},
           {returnDocument:'after'}
         );
         if(updatedInfo.lastErrorObject.n===0){
           throw [404,`Error: update failed could not find user with this ${id}`];
         }
   
         return await updatedInfo.value;
    },

    async getBookingsByHostId(hostId){
      let propertyList = await propertyData.getPropertyByHostId(hostId);
      let bookingCollection = await booking();
      let hostBookings = await bookingCollection.find({property_id:{$in:propertyList.map(x => x._id )}}).toArray();
      console.log(hostBookings);
      return hostBookings;
    },
    
    }
    
    export default exportedFunctions;