const http = require('http');

const PORT = 3000;

const routeHandler = require('./routes/router');


const server = http.createServer(routeHandler);


server.listen(PORT, 'localhost', () => {
    console.log(`Server running on port ${PORT}....`);
})