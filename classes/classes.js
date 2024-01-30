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

    addDepartment() {
        return new Promise((resolve, reject) => {
            db.query()
        })
    }
};

class Role {
    constructor() {};

    viewRoles() {
        return new Promise((resolve, reject) => {
            db.query('SELECT role.roleId, role.title, role.salary FROM role RIGHT JOIN department ON role.department_id = department.departmentId', function (err, results) {
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

class Employee {
    constructor() {};

    viewEmployees() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee', function (err, results) {
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

module.exports = { Department, Role, Employee };