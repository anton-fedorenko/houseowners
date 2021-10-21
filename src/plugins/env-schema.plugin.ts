import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyEnv from 'fastify-env';

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            MONGODB_URI: string;
        };
    }
}

const envSchema: FastifyPluginAsync = async (fastify, options) => {
    const schema = {
        type: 'object',
        required: [ 'MONGODB_URI' ],
        properties: {
            MONGODB_URI: {
                type: 'string'
            }
        }
    };
      
    const envOptions = {
        schema: schema,
    };

    try {
        fastify.register(fastifyEnv, envOptions);
        await fastify.after();
    } catch (err) {
        fastify.log.error(err);
    }
}

export default fastifyPlugin(envSchema);