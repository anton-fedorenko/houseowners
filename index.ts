import fastify from 'fastify'

const server = fastify();
const port = process.env.PORT || 3000;
//const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';

server.get('/ping', async (request, reply) => {
  return 'index pong\n'
})

server.listen(port, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})






// register plugin below:
/*
const start = async () => {
    try {
        await server.listen(port);
        console.log('Server started successfully');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
*/