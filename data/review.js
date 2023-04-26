import { ObjectId } from 'mongodb';
import exportedFunctions from './review.js';
import { reviewsData } from '../config/mongoCollections.js';
import helpers from '..helper.js';

const exportedFunctions = () => {
    const create = async (
        user_id,
        property_id,
        host_id,
        reviewText,
        ratings,
    ) => {
        user_id = helpers.checkId(user_id, 'User ID');
        property_id = helpers.checkId(property_id, 'Property ID');
        host_id = helpers.checkId(host_id, 'Host ID');
        reviewText = helpers.checkString(reviewText, 'Review text');
        ratings = helpers.checkRating(ratings, 'Rating');
        const review = {
            _id: new ObjectId(),
            used_Id: user_id,
            property_Id: property_id,
            host_Id: host_id,
            reviewText: reviewText,
            ratings: ratings
        }
        const reviewCollection = await reviewsData();
        const insertInfo = await reviewCollection.insertOne(review);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add review');
        }
        const result = JSON.parse(JSON.stringify(review));
        return result;
    }

    const getAll = async () => {
        const reviewCollection = await reviewsData();
        let reviewList = await reviewCollection.find({}).toArray();
        if (!reviewList) {
            throw new Error('Could not get all reviews');
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
        const reviewCollection = await reviewsData();
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
        const reviewCollection = await reviewsData();
        const deletionInfo = await reviewCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete review with id of ${id}`);
        }
        return `${deletionInfo.value.usedId} has been successfully deleted!`;
    }

    const update = async (
        id,
        user_id,
        property_id,
        host_id,
        reviewText,
        ratings,
    ) => {
        id = helpers.checkId(id, 'ID');
        user_id = helpers.checkId(user_id, 'User ID');
        property_id = helpers.checkId(property_id, 'Property ID');
        host_id = helpers.checkId(host_id,'Host ID');
        reviewText = helpers.checkString(reviewText, 'Review Text');
        ratings = helpers.checkRating(ratings, 'Ratings');
        const reviewCollection = await reviewsData();
        const review = await reviewCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { user_id, property_id, host_id, reviewText, ratings } },
            { returnOriginal: false }
        );
        if (!review.value || review.modifiedCount === 0) {
            throw new Error('Could not update review - review may not exist');
        }
        if (review.value.user_id === user_id) {
            throw new Error(`The new name "${review.value.used_id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }
}

export default exportedFunctions;