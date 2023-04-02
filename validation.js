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
  }
};

export default exportedMethods;