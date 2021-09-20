const fastifyPlugin = require('fastify-plugin')
const moment = require('moment');

async function templateEngine(fastify, options) {
    fastify.register(require('point-of-view'), {
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
    })
}

module.exports = fastifyPlugin(templateEngine)