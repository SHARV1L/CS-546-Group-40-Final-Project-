import { ObjectId } from 'mongodb';
import { hosts } from '../config/mongoCollections.js';
import helpers from '..helper.js';

const exportedFunctions = () => {

    const create = async (
        propertyIds,
    ) => {
        propertyIds = helpers.checkStringArray(propertyIds, `Property ID's`);
        const host = {
            _id: new ObjectId(),
            propertyIds: propertyIds
        }
        const hostCollection = await hosts();
        const insertInfo = await hostCollection.insertOne(host);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error('Could not add host');
        }
        const result = JSON.parse(JSON.stringify(host));
        return result;
    }

    const getAll = async () => {
        const hostCollection = await hosts();
        let hostList = await hostCollection.find({}).toArray();
        if (!hostList) {
            throw new Error('Could not get all properties');
        }
        hostList = hostList.map((element) => {
            element._id = element._id.toString();
            return element;
        });
        const result = JSON.parse(JSON.stringify(hostList));
        return result;
    }

    const get = async (id) => {
        id = helpers.checkId(id, 'ID');
        const hostCollection = await hosts();
        const host = await hostCollection.findOne({ _id: new ObjectId(id) });
        if (host === null) {
            throw new Error('No host with that id');
        }
        host._id = host._id.toString();
        const result = JSON.parse(JSON.stringify(host));
        return result;
    }

    const remove = async (id) => {
        id = helpers.checkId(id, 'ID');
        const hostCollection = await hosts();
        const deletionInfo = await hostCollection.findOneAndDelete({
            _id: new ObjectId(id)
        });
        if (deletionInfo.lastErrorObject.n === 0 || deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete host with id of ${id}`);
        }
        return `${deletionInfo.value.id} has been successfully deleted!`;
    }

    const update = async (
        host_id,
        propertyIds
    ) => {
        host_id = helpers.checkId(host_id, "Host ID");
        propertyIds = helpers.checkStringArray(propertyIds, `Property ID's`);
        const hostCollection = await hosts();
        const host = await hostCollection.findOneAndUpdate(
            { _id: new ObjectId(host_id) },
            { $set: { propertyIds } },
            { returnOriginal: false }
        );
        if (!host.value || host.modifiedCount === 0) {
            throw new Error('Could not update host - host may not exist');
        }
        if (host.value.host_id === host_id) {
            throw new Error(`The new name "${host.value.host_id}" is the same as the current name in the database`);
        }
        const renamedBand = await this.get(host_id);
        const result = JSON.parse(JSON.stringify(renamedBand));
        return result;
    }
}
export default exportedFunctions;