const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');

class Roles {
    constructor() {}

    viewRoles() {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.table(results);
        });
    };
};

module.exports = Roles;