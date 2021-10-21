import { ObjectId } from 'bson';

export interface IPost {
    _id: ObjectId,
    houseRef: ObjectId
}