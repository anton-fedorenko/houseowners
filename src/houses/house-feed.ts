import { INotification } from '@app/notifications/notification';
import { IPagination } from '@app/core/pagination/pagination';
import { IPost } from '@app/posts/post';

export interface IHouseFeed {
    notifications: INotification[];
    posts: IPost[];
    pagination: IPagination;
}