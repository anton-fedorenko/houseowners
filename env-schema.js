const fastifyPlugin = require('fastify-plugin')

async function envSchema(fastify, options) {
    const schema = {
        type: 'object',
        required: [ 'MONGODB_URI' ],
        properties: {
            MONGODB_URI: {
                type: 'string'
            }
        }
    }
      
    const envOptions = {
        schema: schema,
    }

    fastify.register(require('fastify-env'), envOptions)
        .ready((err) => {
            if (err) console.error(err)
        })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(envSchema)