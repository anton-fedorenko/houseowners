const fastifyPlugin = require('fastify-plugin')
const path = require('path')

async function static(fastify, options) {
    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, '../static'),
        prefix: '/static/'
    })
}

module.exports = fastifyPlugin(static)