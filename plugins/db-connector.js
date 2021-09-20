const fastifyPlugin = require('fastify-plugin')

async function dbConnector(fastify, options) {
    const mongoUri = process.env.MONGODB_URI;
    fastify.register(require('fastify-mongodb'), {
        url: mongoUri
    })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)