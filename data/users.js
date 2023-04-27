import { users } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';
import validation from '../validation.js';
import bcrypt from '../bcrypt.js';

let exportedFunctions = {

  async createUser (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    accountType,
    ) {

      // needs to be uncommented later ************** /

    // firstName = validation.checkString(firstName,'First Name');
    // lastName = validation.checkString(lastName,'Last Name');
    // email = validation.checkValidEmail(email,'Email Address');
    // password = validation.checkValidPassword(password,'Password');
    // phoneNumber = validation.checkValidPhone(phoneNumber,'Phone Number');
    // accountType = (accountType, 'User - Preference');
    
    //profilePicture=validation.checkValidProfilePicture(profilePicture,Profile1);
    //accountType = validation.checkString(accountType, "Account Type");
    //console.log(firstName);

    console.log("This is inside createUser data function: ", firstName, lastName, email, password, phoneNumber)   /// printed from here

    try {
      const userCollection = await users();
  
      const existingUser = await userCollection.findOne({email: email.trim()});
   
      if (existingUser) {
        //throw 'User already exists';
        const user = await this.getUserById(existingUser.id);
        return res.render('/login', {user});
      }
      else {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.encryption(password);
  
        let newUser = {
  
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          //password: password.trim(),
          password: hashedPassword,
          phoneNumber: phoneNumber.trim(),
          //profilePicture:profilePicture,
          accountType: accountType
        };
        
        //const userCollection = await users();
        const newInsertInformation = await userCollection.insertOne(newUser);
        if(!newInsertInformation.insertedId) throw "Insertion Failed";
        return await this.getUserById(newInsertInformation.insertedId.toString());  
      }
    } catch (error) {
      console.log(error);
    }

  },
    
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
    
  async getUserById (id) {
    id = validation.checkId( id );
    console.log(id);
    const userCollection = await users();
    console.log(userCollection);
    const user = await userCollection.findOne({_id : new ObjectId(id)});
    console.log(user);
    if(!user) throw "User Not Found error";
    return user;
  },
    
  async removeUser ( id ) {
    id=validation.checkId(id);
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
    _id:ObjectId(id)
    });
    if(deletionInfo.lastErrorObject.n === 0) throw [404,`Error: could not delete user with ${id}`];

    return {...deletionInfo.value,deleted : true};
    },
    
    async updateUserPut (
    id,
    firstName,
    lastName   
    ) {
      id = validation.checkId( id );
      firstName = validation.checkString(firstName, 'First Name');
      lastName = validation.checkString(lastName, 'Last Name');
      
      const userUpdatedInfo = {
       firstName : firstName,
       lastName : lastName
      };

      const userCollection = await users();
      const updatedInfo = await userCollection.findOneAndUpdate(
        {_id : new ObjectId(id)},
        {$set : userUpdatedInfo},
        {returnDocument : 'after'}
      );
      if(updatedInfo.lastErrorObject.n === 0 ){
        throw [404,`Error: Updation failed could not find user with that specific id`];
      }
      return await updatedInfo.value;

    },

    async updateUserPatch ( id, userInfo ) {
    id = validation.checkId(id);
    if(userInfo.firstName)
      userInfo.firstName = validation.checkString(userInfo.firstName, 'first name');
      
    if(userInfo.lastName)
      userInfo.lastName = validation.checkString(userInfo.lastName, 'last name');
     
    const userCollection = await users();
    const updatedInfo = await userCollection.findOneAndUpdate(
      {_id : new ObjectId(id)},
      {$set : userInfo},
      {returnDocument : 'after'}
    );

    if(updatedInfo.lastErrorObject.n === 0){
      throw [404,`Error: update failed could not find user with this ${id}`];
    }

      return await updatedInfo.value;
    },
    
    async checkUser (email, password) {
  
    if (!email || !password) {
      throw 'Both email address and password are required.';
    }
    if (!validateEmail(email)) {
      throw 'Invalid email address.';
    }
    if (!validatePassword(password)) {
      throw 'Invalid password. The password must be at least 8 characters long, and contain at least one uppercase letter, one number, and one special character.';
    }
    
    const userCollection = await users();
    // Case-insensitive email search
    const user = await userCollection.findOne({email : email});
    
    if(user) { 
      // Check password using bcrypt
      if (!bcrypt.comparePass(password, user.password)) {
        throw 'Passwords do not match';
      } else {
        // Return user data without password
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phonenumber
      };
    }
  }
  else return null; 
  },
}

function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  
function validatePassword (password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}
  //module.exports = { createUser, getAllUsers, getUserById, removeUser, updateUserPatch, updateUserPut }; 
  export default exportedFunctions;
