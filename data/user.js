import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import helpers from '../helper.js';

const exportedFunctions = () => {
    const create = async (
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        profilePicture,
        accountType,
    ) => {
        firstName = helpers.checkString(firstName, "First name");
        lastName = helpers.checkString(lastName, "Last name");
        email = helpers.checkString(email, "Email");
        password = helpers.checkString(password, "Password");
        phoneNumber = helpers.checkPhoneNumber(phoneNumber, "Phone number");
        // profilePicture = helpers.
        accountType = helpers.checkString(accountType, "Account type");
        const user = {
            _id: new ObjectId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture,
            accountType: accountType
        }
        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(user);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add user');
        }
        const result = JSON.parse(JSON.stringify(user));
        return result;
    }

    const getAll = async () => {
        const userCollection = await users();
        let userList = await userCollection.find({}).toArray();
        if (!userList) {
            throw new Error('Could not get all users');
        }
        userList = userList.map((element) => {
            element._id = element._id.toString();
            return element;
        });
        const result = JSON.parse(JSON.stringify(userList));
        return result;
    }

    const get = async (id) => {
        id = helpers.checkId(id, 'ID');
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: new ObjectId(id) });
        if (user === null) {
            throw new Error('No user with that id');
        }
        user._id = user._id.toString();
        const result = JSON.parse(JSON.stringify(user));
        return result;
    }

    const remove = async (id) => {
        id = helpers.checkId(id, 'ID');
        const userCollection = await users();
        const deletionInfo = await userCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete user with id of ${id}`);
        }
        return `${deletionInfo.value.id} has been successfully deleted!`;
    }

    const update = async (
        id,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        profilePicture,
        accountType,
    ) => {
        id = helpers.checkId(id, 'ID');
        firstName = helpers.checkId(firstName, 'First name');
        lastName = helpers.checkString(lastName, "Last name");
        email = helpers.checkString(email, "Email");
        password = helpers.checkString(password, "Password");
        phoneNumber = helpers.checkPhoneNumber(phoneNumber, "Phone number");
        // profilePicture = helpers.
        accountType = helpers.checkString(accountType, "Account type");
        const userCollection = await users();
        const user = await userCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { firstName, lastName, email, password, phoneNumber, profilePicture, accountType } },
            { returnOriginal: false }
        );
        if (!user.value || user.modifiedCount === 0) {
            throw new Error('Could not update user - user may not exist');
        }
        if (user.value.id === id) {
            throw new Error(`The new name "${user.value.id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }
}
export default exportedFunctions;