import type { Db, Collection, ObjectId } from 'mongodb';

import { IPerson } from './person';

export class PersonsRepository {
    private collection: Collection<IPerson>;

    constructor(
        db: Db
    ) {
        this.collection = db.collection('persons');
    }

    async getPersons(ids: ObjectId[]): Promise<IPerson[]> {
        return this.collection.find({ _id: { $in: ids } }).toArray();
    }
}