const path = require('path')

module.exports = async function (fastify, opts) {
    fastify.register(require('./env-schema'))
    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'static'),
        prefix: '/static/'
    })
    fastify.register(require('point-of-view'), {
        engine: {
            nunjucks: require('nunjucks')
        }
    })
    fastify.register(require('./db-connector'))
    fastify.register(require('./houses-route'))
}