const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');


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
            inquirer.prompt({
                type: 'input',
                message: 'What is the name of the department you would like to create?',
                name: 'department',
            }) 
            .then((data) => {
                const query = `
                INSERT INTO department (departmentName)
                VALUES ("${data.department}")
                `
                db.query(query, function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${data.department} has been successfully added!`);
                        resolve(results);
                    };
                })
            })
        })
    };
};

class Role {
    constructor() {};

    viewRoles() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT role.roleId, role.roleTitle, role.roleSalary, department.departmentName
                FROM role
                INNER JOIN department ON role.departmentId = department.departmentId;
            `
            db.query(query, function (err, results) {
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

    addRole() {
        return new Promise((resolve, reject) => {
            inquirer.prompt([
                {
                type: 'input',
                message: 'What is the title of the role you would like to create?',
                name: 'roleTitle',
                },
                {
                type: 'input',
                message: 'What is the annual salary of this new role?',
                name: 'roleSalary',    
                },
                {
                type: 'input',
                message: 'What is the departmentId for this role?',
                name: 'departmentId',    
                },
            ]) 
            .then((data) => {
                const query = `
                INSERT INTO role (roleTitle, roleSalary, departmentId)
                VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.departmentId}")
                `
                db.query(query, function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${data.roleTitle} has been successfully added!`);
                        resolve(results);
                    };
                });
            });
        });
    };
};

class Employee {
    constructor() {};

    viewEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT employee.employeeId, employee.firstName, employee.lastName, role.roleTitle, role.roleSalary
                FROM employee
                INNER JOIN role ON employee.roleId = role.roleId;
            `
            db.query(query, function (err, results) {
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

    addEmployee() {
        return new Promise((resolve, reject) => {
            inquirer.prompt([
                {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'firstName',
                },
                {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'lastName',    
                },
                {
                type: 'input',
                message: 'What is the roleId for this employee?',
                name: 'roleId',    
                },
            ]) 
            .then((data) => {
                const query = `
                INSERT INTO employee (firstName, lastName, roleId)
                VALUES ("${data.firstName}", "${data.lastName}", "${data.roleId}")
                `
                db.query(query, function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${data.firstName} ${data.lastName} has been successfully added!`);
                        resolve(results);
                    };
                });
            });
        });
    };

    updateEmployeeRole() {
        return new Promise((resolve, reject) => {
            inquirer.prompt([
                {
                type: 'input',
                message: 'What is the last mame of the employee?',
                name: 'lastName',
                },
                {
                type: 'input',
                message: 'What is the new roleId for this employee?',
                name: 'roleId',    
                },
            ]) 
            .then((data) => {
                const query = `
                UPDATE employee 
                SET roleId = ${data.roleId}
                WHERE lastName = "${data.lastName}";
                `
                db.query(query, function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${data.lastName} role has been successfully updated!`);
                        resolve(results);
                    };
                });
            })
            .then(() => {
                this.viewEmployees();
            });
        });
    }
};

module.exports = { Department, Role, Employee };