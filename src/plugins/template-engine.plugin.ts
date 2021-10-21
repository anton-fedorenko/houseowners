import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import pointOfView from 'point-of-view';
import moment from 'moment';

const templateEngine: FastifyPluginAsync = async (fastify, options) => {
    fastify.register(pointOfView, {
        engine: {
            nunjucks: require('nunjucks')
        }, 
        options: {
            onConfigure: (env) => {
                env.addFilter('date', function(date, format) {
                    return moment(date).format(format);
                });
            }
        }
    });
}

export default fastifyPlugin(templateEngine);