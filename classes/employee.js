const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');

class Employee {
    constructor() {}

    viewEmployees() {
        db.query('SELECT * FROM employee', function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.table(results);
        });
    };
};

module.exports = Employee;