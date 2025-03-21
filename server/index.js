const server = require('./src/server');

const port = 8081;

server.listen(port, () => console.log(`Express server listening on ${port}`));