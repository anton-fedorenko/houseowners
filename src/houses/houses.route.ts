import { FastifyPluginAsync } from 'fastify';
import { HousesService } from '@app/houses/houses.service';
import { HousePages } from './house-pages';
import { RenderUtils } from './render-utils';


interface IHomeIdentifierParam {
    identifier: string;
}

interface IPaginationQueryString {
    page?: string;
}

const routes: FastifyPluginAsync = async (fastify, options) => {
    if (!fastify.mongo.db) 
        throw new Error('There is no db connection'); 
    const housesService = new HousesService(fastify);
    
    fastify.get<{
        Params: IHomeIdentifierParam,
        Querystring: IPaginationQueryString,
    }>('/houses/:identifier', async (request, reply) => {
        const identifier = request.params.identifier;
        const page = request.query.page ? parseInt(request.query.page, 10) : 1;
        const house = await housesService.getHouse(identifier);
        if (!house) 
            throw new Error('House not found: ' + identifier);
        const feed = await housesService.getFeed(house, page);
        return RenderUtils.renderWithContext(reply, HousePages.feed, house, feed);
    })

    fastify.get<{
        Params: IHomeIdentifierParam,
    }>('/houses/:identifier/about', async (request, reply) => {
        const identifier = request.params.identifier;
        const house = await housesService.getHouse(identifier);
        if (!house) 
            throw new Error('House not found: ' + identifier);
        return RenderUtils.renderWithContext(reply, HousePages.about, house, { house });
    })

    fastify.get<{
        Params: IHomeIdentifierParam,
    }>('/houses/:identifier/organizations', async (request, reply) => {
        const identifier = request.params.identifier;
        const house = await housesService.getHouse(identifier);
        if (!house) 
            throw new Error('House not found: ' + identifier);
        const organizations = await housesService.getOrganizations(house);
        return RenderUtils.renderWithContext(reply, HousePages.organizations, house, { organizations });
    })
}

export default routes;