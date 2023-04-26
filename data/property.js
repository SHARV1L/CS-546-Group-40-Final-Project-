import { ObjectId } from 'mongodb';
import exportedFunctions from './review.js';
import { propertysData } from '../config/mongoCollections.js';
import helpers from '..helper.js';

const exportedFunctions = () => {

    const create = async (
        user_Id,
        propertyName,
        description,
        numberOfRooms,
        numberofBathrooms,
        amenities,
        address,
        latitude,
        longitude,
        pricePerNight,
        availability
    ) => {
        user_Id = helpers.checkId(user_Id, "User ID");
        propertyName = helpers.checkString(propertyName, "Property Name");
        description = helpers.checkString(description, "Description");
        numberOfRooms = helpers.checkNumber(numberOfRooms, "number of rooms");
        numberofBathrooms = helpers.checkNumber(numberofBathrooms, "number of bathrooms");
        amenities = helpers.checkStringArray(amenities, "Amenities");
        address = helpers.checkString(address, "Address");
        latitude = helpers.checkString(latitude, "Latitude");
        longitude = helpers.checkString(longitude, "Longitude");
        pricePerNight = helpers.checkNumber(pricePerNight, "Price per night");
        availability = helpers.checkString(availability, "Availability");
        const property = {
            _id: new ObjectId(),
            user_Id: user_Id,
            propertyName: propertyName,
            description: description,
            numberOfRooms: numberOfRooms,
            numberofBathrooms: numberofBathrooms,
            amenities: amenities,
            address: address,
            latitude: latitude,
            longitude: longitude,
            pricePerNight: pricePerNight,
            availability: availability
        }
        const propertyCollection = await propertysData();
        const insertInfo = await propertyCollection.insertOne(property);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add property');
        }
        const result = JSON.parse(JSON.stringify(property));
        return result;
    }

    const getAll = async () => {
        const propertyCollection = await propertysData();
        let propertyList = await propertyCollection.find({}).toArray();
        if (!propertyList) {
            throw new Error('Could not get all properties');
        }
        propertyList = propertyList.map((element) => {
            element._id = element._id.toString();
            return element;
        });
        const result = JSON.parse(JSON.stringify(propertyList));
        return result;
    }

    const get = async (id) => {
        id = helpers.checkId(id, 'ID');
        const propertyCollection = await propertysData();
        const property = await propertyCollection.findOne({ _id: new ObjectId(id) });
        if (property === null) {
            throw new Error('No property with that id');
        }
        property._id = property._id.toString();
        const result = JSON.parse(JSON.stringify(property));
        return result;
    }

    const remove = async (id) => {
        id = helpers.checkId(id, 'ID');
        const propertyCollection = await propertysData();
        const deletionInfo = await propertyCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete property with id of ${id}`);
        }
        return `${deletionInfo.value.id} has been successfully deleted!`;
    }

    const update = async (
        property_id,
        user_id,
        propertyName,
        description,
        numberOfRooms,
        numberofBathrooms,
        amenities,
        address,
        latitude,
        longitude,
        pricePerNight,
        availability
    ) => { 
        property_id = helpers.checkId(property_id, "Property ID");
        user_id = helpers.checkId(user_id, "User ID");
        propertyName = helpers.checkString(propertyName, "Property Name");
        description = helpers.checkString(description, "Description");
        numberOfRooms = helpers.checkNumber(numberOfRooms, "number of rooms");
        numberofBathrooms = helpers.checkNumber(numberofBathrooms, "number of bathrooms");
        amenities = helpers.checkStringArray(amenities, "Amenities");
        address = helpers.checkString(address, "Address");
        latitude = helpers.checkString(latitude, "Latitude");
        longitude = helpers.checkString(longitude, "Longitude");
        pricePerNight = helpers.checkNumber(pricePerNight, "Price per night");
        availability = helpers.checkString(availability, "Availability");
        const propertyCollection = await propertysData();
        const property = await propertyCollection.findOneAndUpdate(
            { _id: new ObjectId(property_id) },
            { $set: { user_id, propertyName, description, numberOfRooms, numberofBathrooms, amenities, address, latitude, longitude, pricePerNight, availability } },
            { returnOriginal: false }
        );
        if (!property.value || property.modifiedCount === 0) {
            throw new Error('Could not update property - property may not exist');
        }
        if (property.value.property_id === property_id) {
            throw new Error(`The new name "${property.value.property_id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(property_id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }
}

export default exportedFunctions;