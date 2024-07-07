const url = require('url');

const userRoutes = require('./userRoutes/userRoutes.js')

const routeHandler = (req, res) => { 
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    res.setHeader('Content-type', 'application/json'); 

    if (path === '/users' || path.startsWith('/users/')) { 
        userRoutes(req, res);
    }else {
        res.setHeader('Content-type', 'application/json');
        res.writeHead(404); 
        res.end(JSON.stringify({message: 'Route does not exist'}));
    } 
}

module.exports = routeHandler;