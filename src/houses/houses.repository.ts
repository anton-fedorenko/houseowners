import type { Db, Collection } from 'mongodb';

import { IHouse } from './house';

export class HousesRepository {
    private collection: Collection<IHouse>;

    constructor(
        db: Db
    ) {
        this.collection = db.collection('houses');
    }

    async getHouseByPage(page: string): Promise<IHouse | undefined> {
        return this.collection.findOne({ page });
    }
}