const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

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

    async addRole() {
        return new Promise((resolve, reject) => {
            const departmentQuery = `
                SELECT departmentName
                FROM department
            `;

            db.query(departmentQuery, function(err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    let departmentChoices = results.map(department => `${department.departmentName}`);
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
                        type: 'list',
                        message: 'What department does this role belong to?',
                        name: 'department',
                        choices: departmentChoices,  
                        },
                    ]) 
                    .then((data) => {
                        const departmentIdQuery = `
                            SELECT departmentId
                            FROM department
                            WHERE departmentName = '${data.department}
                            `;
                        return db.query(departmentIdQuery);
                    })
                    .then((departmentData) => {
                        const addRoleQuery = `
                            INSERT INTO role (roleTitle, roleSalary, departmentId)
                            VALUES ("${data.roleTitle}", "${data.roleSalary}", "${departmentData[0].departmentId}")
                            `;
                        return db.query(addRoleQuery)
                    })
                    .then(() => {
                        console.log(`${roleTitle} has been successfully added!`)
                        resolve(results);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    })
                }
            });
        });
    };
};

module.exports = Role;