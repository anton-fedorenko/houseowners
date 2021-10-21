import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyStatic from 'fastify-static';
import path from 'path';

const staticFiles: FastifyPluginAsync = async (fastify, options) => {
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../../static'),
        prefix: '/static/'
    });
}

export default fastifyPlugin(staticFiles);