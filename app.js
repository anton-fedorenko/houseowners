module.exports = async function (fastify, opts) {
    fastify.register(require('point-of-view'), {
        engine: {
            nunjucks: require('nunjucks')
        }
    })
    fastify.register(require('./db-connector'))
    fastify.register(require('./houses-route'))
}