const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


class Department {
    constructor() {};

    viewDepartments() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM department', function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.table(results);
                    resolve(results);
                };
            });
        });
    };
};

class Roles {
    constructor() {};

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

class Employee {
    constructor() {};

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

module.exports = { Department, Roles, Employee };