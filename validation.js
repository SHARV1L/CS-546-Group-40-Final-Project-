import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkId(id, variableName) {
    if (!id) throw `Error: You must provide a ${variableName}`;
    if (typeof id !== 'string') throw `Error:${variableName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${variableName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${variableName} invalid object ID`;
    return id;
  },

  checkString(strVal, variableName) {
    if (!strVal) throw `Error: You must supply a ${variableName}!`;
    if (typeof strVal !== 'string') throw `Error: ${variableName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${variableName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${variableName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, variableName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${variableName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${variableName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  checkValidEmail(strEmail,variableName){

    var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validEmail.test(strEmail)) throw "It is not a valid email";
  
    return strEmail;
  
  },

  checkValidPassword(strPassword,variableName){
    if(strPassword.length<8) throw "password length should be 8 charcters";

    const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if(!validPass.test(strPassword)) throw "Password must contain at least one lowercase letter, one uppercase letter, and one digit";

    return strPassword;
  },
  checkValidPhone(strPhone,variableName){
    const validPhone = /^\d{10}$/;
    if(validPhone.test(strPhone,variableName)) throw "You must provide valid phone number";
    
    return strPhone;
  },
  checkValidProfilePicture(file,variableName){
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) throw "Profile is not valid";

    return file;
      
    }

};



export default exportedMethods;