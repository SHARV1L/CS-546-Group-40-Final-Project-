import { ObjectId } from 'mongodb';

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
  checkInteger(value) {
    const numberValue = parseFloat(value);
  
    if (isNaN(numberValue) || numberValue <= 0) {
      return false;
    }
  
    return Math.floor(numberValue) === numberValue;
  },
  isValidCoordinates(latitude, longitude) {
    return (
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
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

  checkCoordinate(coordinate, varName) {
    if (!coordinate) {
      throw new Error(`You must provide an ${varName}`);
    }
    if (typeof coordinate !== 'string') {
      throw new Error(`Given ${varName} must be a string!`);
    }
    for (let i = 0; i < coordinate.length; i++) {
      if (!(coordinate.charCodeAt(i) >= 48 && coordinate.charCodeAt(i) <= 57) && !(coordinate.charCodeAt(i) == 46) && !(coordinate.charCodeAt(i) == 45)) {
        throw new Error(`You must supply a valid ${varName}!`);
      }
    }
    return coordinate;
  },

  login(username, password) {

    if (username.length > 0 && password.length > 0) {
      return null;
    }
<<<<<<< HEAD
=======
    // Check if the password meets the minimum of 8 length requirement or not
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  // Check if the username contains only alphanumeric characters
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain alphanumeric characters' };
  }
    
>>>>>>> 130379c146789d1c4ad21b6a6257d5ca56207973
    else return validationErrors; // if login is successful
  },

  signup(firstName, lastName, email, password, phoneNumber, accountType, role) {
    const errors = {};
    // Validate username
    if (!firstName) {
      errors.firstname = 'Last Name is required';
      if (!lastName) {
        errors.lastname = 'Last Name is required';
      }
    } else if (firstName.length < 3) {
      errors.firstName = 'First Name should be at least 3 characters long';
    } else if (lastName.length < 2) {
      errors.lastName = 'Last Name should be at least 2 characters long';
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      errors.firstName = 'Username can only contain letters and numbers';
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = 'Username can only contain letters and numbers';
    }
  },

  // Validate password
  checkValidPassword(password) {
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/.test(password)) {
      throw "Invalid Password should be 4 characters long and keep in mind 1 Uppercase, 1 Lower case, 1 special charcter and 1 number";
    }
  },

  // Validate email
  checkValidEmail(email) {
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }
  },
  
  // Validate phone number
  checkValidPhone(phoneNumber) {
    if (!phoneNumber) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phone = 'Invalid phone number format';
    }
  }
};

export default exportedMethods;