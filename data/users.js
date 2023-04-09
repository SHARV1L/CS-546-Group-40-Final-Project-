import { users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

let exportedFunctions = {

    async createUser(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        accountType,
    ){
     firstName=validation.checkString(firstName,'First Name');
     lastName=validation.checkString(lastName,'Last Name');
     email=validation.checkValidEmail(email,'Email Name');
     password=validation.checkValidPassword(password,'password1');
     phoneNumber=validation.checkValidPhone(phoneNumber,'Phone Number');
     //profilePicture=validation.checkValidProfilePicture(profilePicture,Profile1);
     accountType=validation.checkString(accountType,"Account Type");
     //console.log(firstName);

     

     let newUser={
       firstName:firstName,
       lastName:lastName,
       email:email,
       password:password,
       phoneNumber:phoneNumber,
       //profilePicture:profilePicture,
       accountType:accountType
     };
    
  
     const userCollection=await users();
     const newInsertInformation=await userCollection.insertOne(newUser);
     if(!newInsertInformation.insertedId) throw "Insert Failed";
     return await this.getUserById(newInsertInformation.insertedId.toString());
    },
    
    async getAllUsers(){
        const userCollection=await users();
        const userList=await userCollection.find({}).toArray();
        return userList;
    },
    
    async getUserById(id){
      id=validation.checkId(id);
      console.log(id);
      const userCollection= await users();
      console.log(userCollection);
      const user=await userCollection.findOne({_id:new ObjectId(id)});
      console.log(user);
      if(!user) throw "User Not Found error";
      return user;
    },
    
   async removeUser(id){
      id=validation.checkId(id);
      const userCollection=await users();
      const deletionInfo=await userCollection.findOneAndDelete({
        _id:ObjectId(id)
      });
      if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete user with ${id}`];

      return {...deletionInfo.value,deleted:true};
    },
    
    async updateUserPut(
        id,
        firstName,
        lastName   
    ) {
      id=validation.checkId(id);
      firstName=validation.checkString(firstName,'first name');
      lastName=validation.checkString(lastName,'last name');
      
      const userUpdatedInfo={
       firstName:firstName,
       lastName:lastName
      };

      const userCollection=await users();
      const updatedInfo=await userCollection.findOneAndUpdate(
        {_id:ObjectId(id)},
        {$set:userUpdatedInfo},
        {returnDocument:'after'}
      );
      if(updatedInfo.lastErrorObject.n===0){
        throw [404,`Error: Updation failed could not find user with that specific id`];
      }
      return await updatedInfo.value;

    },

    async updateUserPatch(id,userInfo){
     id=validation.checkId(id);
     if(userInfo.firstName)
        userInfo.firstName=validation.checkString(userInfo.firstName,'first name');
      
     if(userInfo.lastName)
        userInfo.lastName=validation.checkString(userInfo.lastName,'last name');
     
      const userCollection=await users();
      const updatedInfo=await userCollection.findOneAndUpdate(
        {_id:ObjectId(id)},
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