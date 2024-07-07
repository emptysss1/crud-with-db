// Использовал express и body-parser

const app = require('./index');

const users = []

let currID = 1;

app.get('/users', (req, res) => res.send(users));

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (userId !== -1) {
        res.send(users.find(u => u.id == userId));
    } else {
        res.send(`User with id ${userId} not found`);
    };
});

app.post('/add-user', (req, res) => {
    users.push({ id: currID++, name: req.body.name, age: req.body.age });
    res.send(req.body);
})

app.put('/users/update/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        res.send('User does not exist').status(400);
    }
    if (req.body.name && req.body.age) {
        const updatedData = { name: req.body.name, age: req.body.age };
        users[userIndex] = { ...users[userIndex], ...updatedData };
        res.send(users[userIndex]);
    } else {
        res.send(`Name and age must be filled out`).status(400);
    }
})

app.delete('/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send(`user ${userId} has been delete`)
    } else {
        res.send(`User does not exist`).status(400);
    }
});

module.exports = app;

