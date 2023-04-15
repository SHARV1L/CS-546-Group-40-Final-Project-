import { ObjectId } from 'mongodb';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) {
            throw new Error(`Error: You must provide an ${varName} to search for`);
        }
        if (typeof id !== 'string') {
            throw new Error(`Error: ${varName} must be a string`);
        }
        id = id.trim();
        if (id.length === 0) {
            throw new Error(`Error: ${varName} cannot be an empty string or just spaces`);
        }
        if (!ObjectId.isValid(id)) {
            throw new Error(`Error: Invalid object ${varName}`);
        }
        return id;
    },
    checkString(strVal, varName) {
        if (!strVal) {
            throw new Error(`Error: You must supply a ${varName}!`);
        }
        if (typeof strVal !== 'string') {
            throw new Error(`Error: ${varName} must be a string!`);
        }
        strVal = strVal.trim();
        if (strVal.length === 0) {
            throw new Error(`Error: ${varName} cannot be an empty string or string with just spaces`);
        }
        if (!isNaN(strVal)) {
            throw new Error(`Error: ${strVal} is not a valid value for ${varName} as it only contains digits`);
        }
        return strVal;
    },
    checkNumbers(str) {
        if (!str) {
            throw new Error(`Error: You must supply a number!`);
        }
        if (typeof str !== 'string') {
            throw new Error(`Error: Given value must be a string!`);
        }
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
            } else {
                return false;
            }
        }
        return true;
    },
    checkStringArray(arr, varName) {
        if (!arr || !Array.isArray(arr)) {
            throw new Error(`Error: You must provide an array of ${varName}`);
        }
        for (let i in arr) {
            if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
                throw new Error(`Error: One or more elements in ${varName} array is not a string or is an empty string`);
            }
            arr[i] = arr[i].trim();
        }
        return arr;
    },
    checkRating(ratingArr, varName) {
        if (!ratingArr || Array.isArray(ratingArr)) {
            throw new Error(`Error: You must provide an array of ${varName}`)
        }
        for (let i in ratingArr) {
            if (typeof ratingArr[i] !== 'number' || ratingArr[i] < 1 || ratingArr[i] > 5) {
                throw new Error(`Error: ${varName} must be a number between 1 and 5`);
            }
        }
        for (let i in ratingArr) {
            if (ratingArr[i] >= 1 && ratingArr[i] <= 5) {
                let str = ratingArr[i].toString();
                if (str.length > 3) {
                    throw new Error("Error: Only one decimal place is allowed");
                }
            } else {
                throw new Error(`Error: ${varName} is out of range`);
            }
        }
    }
};
export default exportedMethods;