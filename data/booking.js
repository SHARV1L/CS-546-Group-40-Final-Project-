import { ObjectId } from 'mongodb';
import { booking } from '../config/mongoCollections.js';
import helpers from '../helper.js';

const exportedFunctions = () => {

    const create = async (
        property_id,
        user_id,
        checkInDate,
        checkOutDate,
        totalPrice
    ) => {
        property_id = helpers.checkId(property_id, "Property ID");
        user_id = helpers.checkId(user_id, "User ID");
        checkInDate = helpers.checkDate(checkInDate, "Check-in Date");
        checkOutDate = helpers.checkDate(checkOutDate, "Check-out Date");
        totalPrice = helpers.checkNumber(totalPrice, "Total Price");
        const booking = {
            _id: new ObjectId(),
            property_id: property_id,
            user_id: user_id,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            totalPrice: totalPrice
        }
        const bookingCollection = await booking();
        const insertInfo = await bookingCollection.insertOne(booking);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add booking');
        }
        const result = JSON.parse(JSON.stringify(booking));
        return result;
    }

    const getAll = async () => {
        const bookingCollection = await booking();
        let bookingList = await bookingCollection.find({}).toArray();
        if (!bookingList) {
            throw new Error('Could not get all bookings');
        }
        bookingList = bookingList.map((element) => {
            element._id = element._id.toString();
            return element;
        });
        const result = JSON.parse(JSON.stringify(bookingList));
        return result;
    }

    const get = async (id) => {
        id = helpers.checkId(id, 'ID');
        const bookingCollection = await booking();
        const booking = await bookingCollection.findOne({ _id: new ObjectId(id) });
        if (booking === null) {
            throw new Error('No booking with that id');
        }
        booking._id = booking._id.toString();
        const result = JSON.parse(JSON.stringify(booking));
        return result;
    }

    const remove = async (id) => {
        id = helpers.checkId(id, 'ID');
        const bookingCollection = await booking();
        const deletionInfo = await bookingCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete booking with id of ${id}`);
        }
        return `${deletionInfo.value.id} has been successfully deleted!`;
    }

    const update = async (
        booking_id,
        user_id,
        checkInDate,
        checkOutDate,
        totalPrice
    ) => {
        booking_id = helpers.checkId(booking_id, "Booking ID");
        user_id = helpers.checkId(user_id, "User ID");
        checkInDate = helpers.checkDate(checkInDate, "Check-in Date");
        checkOutDate = helpers.checkDate(checkOutDate, "Check-out Date");
        totalPrice = helpers.checkNumber(totalPrice, "Total Price");
        const bookingCollection = await booking();
        const booking = await bookingCollection.findOneAndUpdate(
            { _id: new ObjectId(booking_id) },
            { $set: { user_id, checkInDate, checkOutDate, totalPrice } },
            { returnOriginal: false }
        );
        if (!booking.value || booking.modifiedCount === 0) {
            throw new Error('Could not update booking - booking may not exist');
        }
        if (booking.value.booking_id === booking_id) {
            throw new Error(`The new name "${booking.value.booking_id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(booking_id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }

    const updatePut = async (
        bookingId,
        userId,
        checkInDate,
        checkOutDate,
        totalPrice
    ) => {
        bookingId = validation.checkId(bookingId);
        userId = validation.checkId(userId);
        checkInDate = helpers.checkDate(checkInDate, "Check-in Date");
        checkOutDate = helpers.checkDate(checkOutDate, "Check-out Date");
        const updatedBookingInfo = {
            checkInDate,
            checkOutDate,
            totalPrice
        };
        const bookingCollection = await booking();
        const updatedInfo = await bookingCollection.findOneAndUpdate(
            { bookingId: ObjectId(bookingId) },
            { userId: bookingCollection.userId },
            { $set: updatedBookingInfo },
            { returnDocument: 'after' }
        );
        if (updatedInfo.lastErrorObject.n === 0) {
            throw [404, `Error: Updation failed could not find user with that specific id`];
        }
        return await updatedInfo.value;
    }

    const updatePatch = async (id, userInfo) => {
        id = validation.checkId(id);
        userInfo = helpers.checkString(userInfo, "User info");
        //validation functions here

        const bookingCollection = await booking();
        const updatedInfo = await bookingCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: userInfo },
            { returnDocument: 'after' }
        );
        if (updatedInfo.lastErrorObject.n === 0) {
            throw [404, `Error: update failed could not find user with this ${id}`];
        }

        return await updatedInfo.value;
    }

}

export default exportedFunctions;