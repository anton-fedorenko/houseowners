import type { Db, Collection, ObjectId } from 'mongodb';

import { IOrganization } from './organization';

export class OrganizationsRepository {
    private collection: Collection<IOrganization>;

    constructor(
        db: Db
    ) {
        this.collection = db.collection('organizations');
    }

    async getOrganizations(ids: ObjectId[]): Promise<IOrganization[]> {
        return this.collection.find({ _id: { $in: ids } }).toArray();
    }
}