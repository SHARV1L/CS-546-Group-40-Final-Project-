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
    // Check if the password meets the minimum of 8 length requirement or not
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }

    // Check if the username contains only alphanumeric characters
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return { isValid: false, message: 'Username can only contain alphanumeric characters' };
    }

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
  // validate first name and last name
  checkName(strVal, varName) {
    if (!strVal) {
      throw new Error(`You must supply a ${varName}!`);
    }
    if (typeof strVal !== 'string') {
      throw new Error(`${varName} must be a string!`);
    }
    strVal = strVal.trim();
    if (strVal.length === 0) {
      throw new Error(`${varName} cannot be an empty string or string with just spaces`);
    }
    strVal = strVal.toLowerCase();
    if (!isNaN(strVal)) {
      throw new Error(`${strVal} is not a valid value for ${varName} as it only contains digits`);
    }
    for (let i = 0; i < strVal.length; i++) {
      if (strVal.charCodeAt(i) >= 48 && strVal.charCodeAt(i) <= 57) {
        throw new Error(`${varName} should not contain numbers in it!`);
      }
    }
    return strVal;
  },

  // Validate email and convert it to lowercase
  checkEmail(email, varName) {
    if (!email) {
      throw new Error(`You must provide an ${varName}`);
    }
    if (typeof email !== 'string') {
      throw new Error(`Given ${varName} must be a string!`);
    }
    email = email.trim();
    if (email.length === 0) {
      throw new Error(`${varName} cannot be an empty string or string with just spaces`);
    }
    email = email.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(emailRegex.test(email))) {
      throw new Error(`${email} is not a valid ${varName}`);
    }
    if (!isNaN(email)) {
      throw new Error(`${email} is not a valid value for ${varName} as it only contains digits`);
    }
    if (email.indexOf(' ') >= 0) {
      throw new Error(`${varName} must not contain spaces in between `);
    }
    return email;
  },

  // Validate password and password should contain 8 characters with atleast 1 uppercase character, 1 lowercase character, 1 symbol and 1 number
  checkPassword(password, varName) {
    if (!password) {
      throw new Error(`You must provide a ${varName}`);
    }
    if (typeof password != "string") {
      throw new Error(`${varName} must be a string`);
    }
    password = password.trim();
    if (password.length === 0) {
      throw new Error(`${varName} cannot be an empty string or just spaces`);
    }
    if (password.length < 8) {
      throw new Error(`${varName} should be a minimum of 8 characters long`);
    }
    let upperCases = 0;
    let lowerCases = 0;
    let numbers = 0;
    let specialCharacters = 0;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) == 32) {
        throw new Error(`${varName} must not contain spaces in between`);
      }
      else {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          upperCases++;
        }
        else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
          numbers++;
        }
        else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
          lowerCases++;
        }
        else {
          specialCharacters++;
        }
      }
    }
    if (!(upperCases > 0 && numbers > 0 && lowerCases > 0 && specialCharacters > 0)) {
      throw new Error(`For a ${varName}, there needs to be at least one uppercase character, there has to be at least one lowercase character, there has to be at least one number and there has to be at least one special character`);
    }
    return password;
  },
  // Validate phone number which has to be only 10 digits, no need to include the country code 
  checkPhoneNumber(str, varName) {
    if (!str) {
      throw new Error(`You must supply a ${varName}!`);
    }
    if (typeof str !== 'string') {
      throw new Error(`Given ${varName} must be a string!`);
    }
    str = str.trim();
    if (str.length != 10) {
      throw new Error(`Given ${varName} must be of 10 digits, don't include the country code!`);
    }
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
        throw new Error(`You must supply a valid ${varName}!`);
      }
    }
    return str;
  },

  checkAccountType(accountType, varName) {
    if (!accountType) {
      throw new Error(`You must provide a ${varName}`);
    }
    if (typeof accountType !== 'string') {
      throw new Error(`${varName} must be a string`);
    }
    accountType = accountType.trim();
    if (accountType.length === 0) {
      throw new Error(`${varName} cannot be an empty string or just spaces`);
    }
    accountType = accountType.toLowerCase();
    if (!(accountType === 'host' || accountType === 'user')) {
      throw new Error(`${varName} must be either host or user`);
    }
    return accountType;
  },
  checkRole(role, varName) {
    if (!role) {
      throw new Error(`You must provide a ${varName}`);
    }
    if (typeof role !== 'string') {
      throw new Error(`${varName} must be a string`);
    }
    role = role.trim();
    if (role.length === 0) {
      throw new Error(`${varName} cannot be an empty string or just spaces`);
    }
    role = role.toLowerCase();
    if (!(role === 'admin' || role === 'user')) {
      throw new Error(`${varName} must be either host or user`);
    }
    return role;
  },

  checkAge(age, varName) {
    if (!age) {
      throw new Error(`You must provide an ${varName}`);
    }
    if (typeof age !== 'string' || !/^\d+$/.test(age)) {
      throw new Error(`Given ${varName} must be a string!`);
    }
    age = age.trim();
    for (let i = 0; i < age.length; i++) {
      if (age.charCodeAt(i) < 48 || age.charCodeAt(i) > 57) {
        throw new Error(`You must supply a valid ${varName}!`);
      }
    }
    age = parseInt(age.trim(), 10);
    if (age < 13 || age > 100) {
      throw new Error(`${varName} cannot be less than 13 or greater than 100 to register`);
    }
    return age;
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