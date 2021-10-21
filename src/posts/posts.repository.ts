import type { Db, Collection, ObjectId } from 'mongodb';

import { IPost } from './post';

export class PostsRepository {
    private collection: Collection<IPost>;

    constructor(
        db: Db
    ) {
        this.collection = db.collection('posts');
    }

    async countHousePosts(houseId: ObjectId): Promise<number> {
        return this.collection.count({houseRef: houseId});
    }

    async getHousePosts(houseId: ObjectId, skip: number, pageLimit: number): Promise<IPost[]> {
        return this.collection.find({houseRef: houseId})
            .sort({'created.time': -1})
            .skip(skip)
            .limit(pageLimit)
            .toArray();
    }
}