import { ObjectId } from 'mongodb';
import exportedFunctions from './review.js';
import { reviews } from '../config/mongoCollections.js';
import helpers from '..helper.js';

const exportedFunctions = () => {
    const create = async (
        id,
        guest_id,
        property_id,
        host_id,
        reviewText,
        ratings,
    ) => {
        id = helpers.checkId(id, 'ID');
        guest_id = helpers.checkId(guest_id, 'Guest ID');
        property_id = helpers.checkId(property_id, 'Property ID');
        host_id = helpers.checkId(host_id, 'Host ID');
        reviewText = helpers.checkString(reviewText, 'Review text');
        ratings = helpers.checkRating(ratings, 'Rating');
        const review = {
            _id: new ObjectId(),
            guestId: guest_id,
            propertyId: property_id,
            hostId: host_id,
            reviewText: reviewText,
            ratings: ratings
        }
        const reviewCollection = await reviews();
        const insertInfo = await reviewCollection.insertOne(review);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add review');
        }
        const result = JSON.parse(JSON.stringify(review));
        return result;
    }

    const getAll = async () => {
        const reviewCollection = await reviews();
        let reviewList = await reviewCollection.find({}).toArray();
        if (!reviewList) {
            throw new Error('Could not get all bands');
        }
        reviewList = reviewList.map((element) => {
            element._id = element._id.toString();
            return element;
        });
        const result = JSON.parse(JSON.stringify(reviewList));
        return result;
    }

    const get = async (id) => {
        id = helpers.checkId(id, 'ID');
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({ _id: new ObjectId(id) });
        if (review === null) {
            throw new Error('No review with that id');
        }
        review._id = review._id.toString();
        const result = JSON.parse(JSON.stringify(review));
        return result;
    }

    const remove = async (id) => {
        id = helpers.checkId(id, 'ID');
        const reviewCollection = await reviews();
        const deletionInfo = await reviewCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete review with id of ${id}`);
        }
        return `${deletionInfo.value.guestId} has been successfully deleted!`;
    }

    const update = async (
        id,
        guest_id,
        property_id,
        host_id,
        reviewText,
        ratings,
    ) => {
        id = helpers.checkId(id, 'ID');
        guest_id = helpers.checkId(guest_id, 'Guest ID');
        property_id = helpers.checkId(property_id, 'Property ID');
        host_id = helpers.checkId(host_id,'Host ID');
        reviewText = helpers.checkString(reviewText, 'Review Text');
        ratings = helpers.checkRating(ratings, 'Ratings');
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { guest_id, property_id, host_id, reviewText, ratings } },
            { returnOriginal: false }
        );
        if (!review.value || review.modifiedCount === 0) {
            throw new Error('Could not update review - review may not exist');
        }
        if (review.value.guest_id === guest_id) {
            throw new Error(`The new name "${review.value.guest_id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }
}

export default exportedFunctions;