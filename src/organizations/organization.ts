import { ObjectId } from 'bson';
import { IPerson } from '@app/persons/person';

export interface IOrganization {
    _id: ObjectId,                        
    persons: {
        ref: ObjectId;
        person?: IPerson;
    }[];
}