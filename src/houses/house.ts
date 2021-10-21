import { ObjectId } from 'bson';

export interface IHouse {
    _id: ObjectId,
    name: string;
    page: string;
    organizations: ObjectId[];
}