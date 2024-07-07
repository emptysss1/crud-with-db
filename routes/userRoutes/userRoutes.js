const url = require('url');


const listUsers = require('./listUser')
const updateUser = require('./updateUser')
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const getUser = require('./getUser')


const userRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    if (path === '/users' && method === 'GET') {
        listUsers(req, res);
    } else if (path === '/users' && method === 'POST') {
        createUser(req, res);
    } else if (path.startsWith('/users/') && method === 'GET') {
        getUser(req, res);
    } else if (path.startsWith('/users/') && method === 'PUT') {
        updateUser(req, res);
    } else if (path.startsWith('/users/') && method === 'DELETE') {
        deleteUser(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found in users' }))
    }
}

module.exports = userRoutes;