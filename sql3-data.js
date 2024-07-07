const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('myDatabase.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
    async getUsers() {
        try {
            const users = await new Promise((resolve, reject) => {
                let sql = 'SELECT * FROM users';
                db.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(`Error ${err}`);
                    } else {
                        resolve(rows);
                    }
                });
            });
            return users;
        } catch (err) {
            return null;
        }
    },
    async addUser(user) {
        const lastId = await new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
            db.run(sql, [user.name, user.age], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastId);
                }
            });
        });
        return { id: lastId, ...user };
    },

    async updateUser(id, updatedData) {
        const changes = await new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
            db.run(sql, [updatedData.name, updatedData.age, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
        if (changes === 0) {
            return null;
        }
        return this.getUserById(id);
    },
    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            let sql = 'DELETE FROM users WHERE id = ?';
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return changes > 0;
    },
    async getUserById(id) {
        const user = await new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        return user;
    },
}