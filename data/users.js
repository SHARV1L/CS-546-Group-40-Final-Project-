import { users } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';
import validation from '../validation.js';
import bcrypt from '../bcrypt.js';

let exportedFunctions = {

  async createUser(
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    accountType,
    role,
  ) {
    firstName = validation.checkName(firstName, 'First Name');
    lastName = validation.checkName(lastName, 'Last Name');
    email = validation.checkEmail(email, 'Email Address');
    password = validation.checkPassword(password, 'Password');
    phoneNumber = validation.checkValidPhone(phoneNumber, 'Phone Number');
    accountType = validation.checkAccountType(accountType, 'Account type');
    // profilePicture = validation.checkValidProfilePicture(profilePicture, Profile1);
    role = validation.checkRole(role, 'Role');
    console.log(firstName);

    if (role !== 'admin' && role !== 'user') {
      throw " Enter a valid user or admin "
    }

    console.log("This is inside createUser data function: ", firstName, lastName, email, password, phoneNumber, accountType, role)   /// printed from here

    const userCollection = await users();
    const existingUser = await userCollection.findOne({ email: email });

    if (existingUser) {
      throw 'User already exists';
    }
    else {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.encryption(password);

      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        profilePicture: profilePicture,
        accountType: accountType,
        role: role,
      };

      const newInsertInformation = await userCollection.insertOne(newUser);
      if (!newInsertInformation.insertedId) throw "Insertion Failed";
      return await this.getUserById(newInsertInformation.insertedId.toString());
    }
  },

  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },

  async getUserById(id) {
    id = validation.checkId(id, 'ID');
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) throw "User not Found error";
    return user;
  },

  async removeUser(id) {
    id = validation.checkId(id, 'ID');
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
      _id: ObjectId(id)
    });
    if (deletionInfo.lastErrorObject.n === 0) throw [404, `Error: could not delete user with ${id}`];

    return { ...deletionInfo.value, deleted: true };
  },

  async updateUserPut(
    id,
    firstName,
    lastName,   
    accountType
  ) {
    id = validation.checkId(id, 'ID');
    firstName = validation.checkName(firstName, 'First Name');
    lastName = validation.checkName(lastName, 'Last Name');
    accountType = validation.checkAccountType(accountType, 'Account Type');

    const userUpdatedInfo = {
      firstName: firstName,
      lastName: lastName,
      accountType: accountType
    };

    const userCollection = await users();
    const updatedInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: userUpdatedInfo },
      { returnDocument: 'after' }
    );
    if (updatedInfo.lastErrorObject.n === 0) {
      throw [404, `Error: Updation failed could not find user with that specific id`];
    }
    return await updatedInfo.value;

  },

  async updateUserPatch(id, userInfo) {
    id = validation.checkId(id, 'ID');
    if (userInfo.firstName)
      userInfo.firstName = validation.checkName(userInfo.firstName, 'first name');

    if (userInfo.lastName)
      userInfo.lastName = validation.checkName(userInfo.lastName, 'last name');

    const userCollection = await users();
    const updatedInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: userInfo },
      { returnDocument: 'after' }
    );

    if (updatedInfo.lastErrorObject.n === 0) {
      throw [404, `Error: update failed could not find user with this ${id}`];
    }
    return await updatedInfo.value;
  },

  async checkUser(email, password) {
    email = validation.checkEmail(email, 'Email address');
    password = validation.checkPassword(password, 'Password');

    const userCollection = await users();
    // Case-insensitive email search
    const user = await userCollection.findOne({ email: email });

    if (user) {
      // Check password using bcrypt
      if (!bcrypt.comparePass(password, user.password)) {
        throw 'Passwords do not match';
      } else {
        console.log(`Returning user with ID: ${user._id}`); // add logging statement here
        // Return user data without password
        return {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          accountType: user.accountType,
          role: user.role
        };
      }
    }
    else return null;
  },
}

//module.exports = { createUser, getAllUsers, getUserById, removeUser, updateUserPatch, updateUserPut }; 
export default exportedFunctions;

