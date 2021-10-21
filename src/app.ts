import { FastifyPluginAsync } from 'fastify';
import envSchema from './plugins/env-schema.plugin';
import staticFiles from './plugins/static-files.plugin';
import templateEngine from './plugins/template-engine.plugin';
import dbConnector from './plugins/db-connector.plugin';
import housesRoute from './houses/houses.route';

const app: FastifyPluginAsync = async (fastify, options) => {
    fastify.register(envSchema);
    fastify.register(staticFiles);
    fastify.register(templateEngine);
    fastify.register(dbConnector);

    fastify.register(housesRoute);
    console.log('Server started'); 
}

export default app;