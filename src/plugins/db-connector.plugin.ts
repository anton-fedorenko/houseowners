import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from 'fastify-mongodb';

const dbConnector: FastifyPluginAsync = async (fastify, options) => {
    const mongoUri = fastify.config.MONGODB_URI;
    fastify.register(fastifyMongodb, {
        url: mongoUri
    });
}

export default fastifyPlugin(dbConnector);