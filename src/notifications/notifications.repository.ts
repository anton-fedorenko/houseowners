import type { Db, Collection, ObjectId } from 'mongodb';

import { INotification } from './notification';

export class NotificationsRepository {
    private collection: Collection<INotification>;

    constructor(
        db: Db
    ) {
        this.collection = db.collection('notifications');
    }

    async getHouseNotifications(houseId: ObjectId, dateFrom: string): Promise<INotification[]> {
        return this.collection.find({houseRef: houseId, date: {$gt: dateFrom}}).toArray();
    }
}