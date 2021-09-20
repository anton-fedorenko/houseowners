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

module.exports = fastifyPlugin(envSchema)