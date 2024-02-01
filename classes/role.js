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
            return db.promise().query(query)
                .then((data) => {
                    console.table(data[0]);
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
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

            return inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the title of the role you would like to create?',
                        name: 'roleTitle',
                        validate: (input) => {
                            if (!validator.isLength(input, { min: 1, max: 30})) {
                                return 'Role Title must be 1 - 30 characters';
                            } else {
                                 return true;
                            };
                        },
                    },
                    {
                        type: 'input',
                        message: 'What is the annual salary of this new role?',
                        name: 'roleSalary',
                        validate: (input) => {
                            if (!validator.isDecimal(input)) {
                                return 'Salary must be decimal number';
                            } else {
                                 return true;
                            };
                        },
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

    deleteRole() {
        return new Promise ((resolve, reject) => {
            let roles;

            const rolesQuery = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `;

            return db.promise().query(rolesQuery)
            .then((rolesResult) => {
                roles = rolesResult[0];
                console.log(roles)

                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which role would you like to delete?',
                    name: 'roles',    
                    choices: roles,
                    },
                ]) 
            })
            .then((data) => {
                const query = `
                    DELETE FROM role
                    WHERE roleId = ${data.roles}
                `;

                return db.promise().query(query);
            })
            .then(() => {
                console.log('Role successfully deleted!')
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
};

module.exports = Role;