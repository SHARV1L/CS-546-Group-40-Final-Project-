import { ObjectId } from 'mongodb';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) {
            throw new Error(`You must provide an ${varName} to search for`);
        }
        if (typeof id !== 'string') {
            throw new Error(`${varName} must be a string`);
        }
        id = id.trim();
        if (id.length === 0) {
            throw new Error(`${varName} cannot be an empty string or just spaces`);
        }
        if (!ObjectId.isValid(id)) {
            throw new Error(`Invalid object ${varName}`);
        }
        return id;
    },
    checkString(strVal, varName) {
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
        if (!isNaN(strVal)) {
            throw new Error(`${strVal} is not a valid value for ${varName} as it only contains digits`);
        }
        return strVal;
    },
    checkPhoneNumber(str, varName) {
        if (!str) {
            throw new Error(`You must supply a ${varName}!`);
        }
        if (typeof str !== 'string') {
            throw new Error(`Given ${varName} must be a string!`);
        }
        str = str.trim();
        if (str.length != 10) {
            throw new Error(`Given ${varName} must be of 10 digits!`);
        }
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
                throw new Error(`You must supply a valid ${varName}!`);
            }
        }
        return str;
    },
    checkStringArray(arr, varName) {
        if (!arr || !Array.isArray(arr)) {
            throw new Error(`You must provide an array of ${varName}`);
        }
        for (let i in arr) {
            if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
                throw new Error(`One or more elements in ${varName} array is not a string or is an empty string`);
            }
            arr[i] = arr[i].trim();
        }
        return arr;
    },
    checkRating(ratingArr, varName) {
        if (!ratingArr || Array.isArray(ratingArr)) {
            throw new Error(`You must provide an array of ${varName}`)
        }
        for (let i in ratingArr) {
            if (typeof ratingArr[i] !== 'number' || ratingArr[i] < 1 || ratingArr[i] > 5) {
                throw new Error(`${varName} must be a number between 1 and 5`);
            }
        }
        for (let i in ratingArr) {
            if (ratingArr[i] >= 1 && ratingArr[i] <= 5) {
                let str = ratingArr[i].toString();
                if (str.length > 3) {
                    throw new Error("Only one decimal place is allowed");
                }
            } else {
                throw new Error(`${varName} is out of range`);
            }
        }
        return ratingArr;
    },
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
        if (!isNaN(strVal)) {
            throw new Error(`${strVal} is not a valid value for ${varName} as it only contains digits`);
        }
        if (email.indexOf(' ') >= 0) {
            throw new Error(`${varName} must not contain spaces in between `);
        }
        return email;
    },
    checkNumber(number, varName) {
        if (!number) {
            throw new Error(`You must provide an ${varName}`);
        }
        if (typeof number !== 'string') {
            throw new Error(`Given ${varName} must be a string!`);
        }
        number = number.trim();
        for (let i = 0; i < number.length; i++) {
            if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
                throw new Error(`You must supply a valid ${varName}!`);
            }
        }
        return number;
    },
    checkImageFile(file, varName) {
        if (!file) {
            throw new Error(`You must supply a valid ${varName}!`);
        }
        const reader = new FileReader();
        file = reader.readAsDataURL(file);
        if (!(
            new Promise((resolve, reject) => {
                reader.onload = () => {
                    const image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        const width = image.width;
                        const height = image.height;
                        const isValid = (typeof width === 'number' && width > 0 && typeof height === 'number' && height > 0);
                        resolve(isValid);
                    };
                    image.onerror = () => {
                        reject(false);
                    };
                };
            }))) {
            throw new Error(`${varName} is invalid`);
        };
        return file;
    },
    checkDate(date, varName) {
        if (!date) {
            throw new Error(`You must supply a valid ${varName}!`);
        }
        if (typeof date !== 'string') {
            throw new Error(`Given ${varName} must be a string!`);
        }
        date = date.trim();
        if (date.length === 0) {
            throw new Error(`${varName} cannot be an empty string or string with just spaces`);
        }
        let parts = date.split('-');
        let month = parseInt(parts[0], 10);
        let day = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);
        if (isNaN(month) || isNaN(day) || isNaN(year)) {
            throw new Error(`${varName} must be provided in the form of mm-dd-yyyy`);
        }
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            throw new Error(`Either month or date is provided incorrect!`);
        }
        let currentDate = new Date();
        if (year > currentDate.getFullYear()) {
            throw new Error(`Year cannot be more than the current year!`);
        }
        if (year === currentDate.getFullYear() && month > currentDate.getMonth() + 1) {
            throw new Error(`Month cannot be more than the current month of the current year!`);
        }
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1 && day > currentDate.getDate()) {
            throw new Error(`Date cannot be more than the current date of the current month of the current year!`);
        }
        return date;
    }

};
export default exportedMethods;