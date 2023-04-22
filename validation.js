import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  login(username, password) {
    if (username.length > 0 && password.length > 0) {
      return null;
    }
    
    else return validationErrors; // if login is successful
  },

  signup(username, password, email, phone) {
    const errors = {};
  
    // Validate username
    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username should be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.username = 'Username can only contain letters and numbers';
    }
  
    // // Validate password
    // if (!password) {
    //   errors.password = 'Password is required';
    // } else if (password.length < 8) {
    //   errors.password = 'Password should be at least 8 characters long';
    // }
  
    // // Validate email
    // if (!email) {
    //   errors.email = 'Email is required';
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   errors.email = 'Invalid email format';
    // }
  
    // // Validate phone number
    // if (!phone) {
    //   errors.phone = 'Phone number is required';
    // } else if (!/^\d{10}$/.test(phone)) {
    //   errors.phone = 'Invalid phone number format';
    // }
  
    return errors;
  }

};

export default exportedMethods;