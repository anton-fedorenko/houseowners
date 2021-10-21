import { FastifyInstance } from 'fastify';
import { IPerson } from '@app/persons/person';
import { IOrganization } from '@app/organizations/organization';
import { OrganizationsRepository } from '@app/organizations/organizations.repository';
import { PersonsRepository } from '@app/persons/persons.repository';
import { IHouse } from './house';
import { HousesRepository } from './houses.repository';
import { IHouseFeed } from './house-feed';
import { PaginationUtils } from '@app/core/pagination/pagination-utils';
import { IPost } from '@app/posts/post';
import { INotification } from '@app/notifications/notification';
import { PageUtils } from './page-utils';
import { HousePages } from './house-pages';
import { PostsRepository } from '@app/posts/posts.repository';
import { NotificationsRepository } from '@app/notifications/notifications.repository';

export class HousesService {
    private readonly housesRepository: HousesRepository;
    private readonly organizationsRepository: OrganizationsRepository;
    private readonly personsRepository: PersonsRepository;
    private readonly postsRepository: PostsRepository;
    private readonly notificationsRepository: NotificationsRepository;

    constructor(
        fastify: FastifyInstance
    ) {
        if (!fastify.mongo.db) 
            throw new Error('There is no db connection'); 
        const db = fastify.mongo.db;
        this.housesRepository = new HousesRepository(db);
        this.organizationsRepository = new OrganizationsRepository(db);
        this.personsRepository = new PersonsRepository(db);
        this.postsRepository = new PostsRepository(db);
        this.notificationsRepository = new NotificationsRepository(db);
    }

    async getHouse(page: string): Promise<IHouse | undefined> {
        return this.housesRepository.getHouseByPage(page);
    }

    async getOrganizations(house: IHouse): Promise<IOrganization[]> {
        const organizations: IOrganization[] = 
            await this.organizationsRepository.getOrganizations(house.organizations);
        const personsRefs = organizations
            .filter(org => !!org.persons)
            .flatMap(org => org.persons)
            .map(person => person.ref);
        const persons: IPerson[] = await this.personsRepository.getPersons(personsRefs);
        const personsMap = persons.reduce((map, person) => {
            map[person._id.toHexString()] = person;
            return map;
        }, {});
        organizations
            .filter(org => !!org.persons)
            .forEach(org => {
                org.persons.forEach(personItem => {
                    personItem.person = personsMap[personItem.ref.toHexString()];
                });
            });
        return organizations;
    }

    async getFeed(house: IHouse, page: number): Promise<IHouseFeed> {
        const houseId = house._id;
        const pageLimit = 3;
        const count: number = await this.postsRepository.countHousePosts(houseId);
        const skip = (page - 1) * pageLimit;
        const posts: IPost[] = await this.postsRepository.getHousePosts(houseId, skip, pageLimit);
        const appPageRef = PageUtils.getPageRef(house, HousePages.feed);
        const pagination = PaginationUtils.getPagination(appPageRef, page, count, pageLimit);
        
        const notifications: INotification[] = 
            await this.notificationsRepository.getHouseNotifications(houseId, '2021-09-05'); 

        return {
            notifications,
            posts,
            pagination
        };
    }
}