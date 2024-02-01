const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

class Role {
    constructor() { };

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
        return new Promise ((resolve, reject) => {
        const departmentQuery = `
            SELECT departmentName AS name, departmentId AS value
            FROM department
        `;

        return db.promise().query(departmentQuery)
            .then(departments => {
            console.log(departments);

            return inquirer
                .prompt([
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
                        type: 'list',
                        message: 'What department does this role belong to?',
                        name: 'department',
                        choices: departments[0],
                    },
                ])
            })
            .then((data) => {
                const addRoleQuery = `
                INSERT INTO role (roleTitle, roleSalary, departmentId)
                VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.department}")
                `;
                return db.promise().query(addRoleQuery)
            })
            .then(() => {
                console.log(`Role has been successfully added!`)
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject();
            });
        });
    };
};

module.exports = Role;