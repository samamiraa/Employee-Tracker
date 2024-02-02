//* imports dependancies
const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

class Role {
    constructor() { };

    viewRoles() {
        return new Promise((resolve, reject) => {
            //* SQL syntax to get role info
            const query = `
                SELECT role.roleId, role.roleTitle, role.roleSalary, department.departmentName
                FROM role
                INNER JOIN department ON role.departmentId = department.departmentId;
            `
            //* executes query to sql database
            return db.promise().query(query)
                .then((data) => {
                    //* displays role info in table
                    console.table(data[0]);
                    resolve();
                })
                //* displays error if any
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
        });
    };

    addRole() {
        return new Promise ((resolve, reject) => {
        //* SQL syntax to get department enfo
        const departmentQuery = `
            SELECT departmentName AS name, departmentId AS value
            FROM department
        `;

        //* executes query to sql database
        return db.promise().query(departmentQuery)
            .then(departments => {

            //* prompts user for name of new role, salary and what department role belongs too
            return inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the title of the role you would like to create?',
                        name: 'roleTitle',
                        validate: (input) => {
                            //* checks to see if input is in length criteria
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
                            //* checks to see if salary input is decimal number
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
                //* SQL syntax to insert user input into role table
                const addRoleQuery = `
                INSERT INTO role (roleTitle, roleSalary, departmentId)
                VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.department}")
                `;
                return db.promise().query(addRoleQuery)
            })
            .then(() => {
                //* confirmation message success
                console.log(`Role has been successfully added!`)
                resolve();
            })
            //* displays error if any
            .catch((err) => {
                console.error(err);
                reject();
            });
        });
    };

    deleteRole() {
        return new Promise ((resolve, reject) => {
            let roles;

            //* SQL syntax to get role info
            const rolesQuery = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `;
            //* executes query to sql database
            return db.promise().query(rolesQuery)
            .then((rolesResult) => {
                roles = rolesResult[0];

                //* prompts user for role to be deleted
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
                //* SQL syntax to delete role
                const query = `
                    DELETE FROM role
                    WHERE roleId = ${data.roles}
                `;

                //* executes query to sql database
                return db.promise().query(query);
            })
            .then(() => {
                //* confirmation message success
                console.log('Role successfully deleted!')
                resolve();
            })
            //* displays error if any
            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
};

//* exports class
module.exports = Role;