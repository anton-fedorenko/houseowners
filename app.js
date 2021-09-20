module.exports = async function (fastify, opts) {
    fastify.register(require('./plugins/env-schema'))
    fastify.register(require('./plugins/static'))
    fastify.register(require('./plugins/template-engine'))
    fastify.register(require('./plugins/db-connector'))
    fastify.register(require('./routes/houses-route'))
}