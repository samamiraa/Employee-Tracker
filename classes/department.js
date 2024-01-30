const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./assets/server');

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
};

module.exports = {
    viewDepartments
};