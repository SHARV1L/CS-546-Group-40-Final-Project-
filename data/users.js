import { users } from "../config/mongoCollections.js";
import ObjectId from 'mongodb';
import validation from '../validation.js';

const exportedFunctions = () => {

    const createUser = async (
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        //profilePicture,
        accountType,
    ) => {
     firstName=validation.checkString(firstName,'First Name');
     lastName=validation.checkString(lastName,'Last Name');
     email=validation.checkValidEmail(email,'Email Name');
     password=validation.checkValidPassword(email,'Email password');
     phoneNumber=validation.checkValidPhone(phoneNumber,'Phone Number');
     //profilePicture=validation.checkValidProfilePicture(profilePicture,Profile1);
     accountType=validation.checkString(accountType,"Account Type");

     let newUser={
       firstName:firstName,
       lastName:lastName,
       email:email,
       password:password,
       phoneNumber:phoneNumber,
       //profilePicture:profilePicture,
       accountType,accountType
     };
     const userCollection=await users();
     const newInsertInformation=await userCollection.insertOne(newUser);
     if(!newInsertInformation.insertedId) throw "Insert Failed";
     return await this.get(newInsertInformation.insertedId.toString());

    }
    
    const getAllUsers = async () => {
        const userCollection=await users();
        const userList=await userCollection.find({}).toArray();
        return userList;
    }
    
    const getUserById = async (id) => {
      id=validation.checkId(id);
      const userCollection= await users();
      const user=await userCollection.findOne({_id:ObjectId(id)});
      if(!user) throw "User Not Found error";
      return user;
    }
    
    const  removeUser = async (id) => {
      id=validation.checkId(id);
      const userCollection=await users();
      const deletionInfo=await userCollection.findOneAndDelete({
        _id:ObjectId(id)
      });
      if(deletionInfo.lastErrorObject.n===0) throw [404,`Error: could not delete user with ${id}`];

      return {...deletionInfo.value,deleted:true};
    }
    
    const updateUserPut = async (
        id,
        firstName,
        lastName   
    ) => {
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

    }

    const updateUserPatch=async(id,userInfo)=>{
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