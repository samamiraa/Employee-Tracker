const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

class Employee {
    constructor() {};

    viewEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT employee.employeeId, employee.firstName, employee.lastName, role.roleTitle, role.roleSalary, department.departmentName, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
                FROM employee
                INNER JOIN role ON employee.roleId = role.roleId
                INNER JOIN department ON role.departmentId = department.departmentId
                LEFT JOIN employee manager ON manager.employeeId = employee.managerId;
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

    addEmployee() {
        return new Promise((resolve, reject) => {
            let roles;
            let managers;

            const roleQuery = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `

            const managerQuery = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
                WHERE managerId IS NULL
                UNION
                SELECT 'None' AS name, null AS value;
            `;

        return Promise.all([db.promise().query(roleQuery), db.promise().query(managerQuery)])
            .then(([rolesResult, managerResult]) => {
            roles = rolesResult[0];
            managers = managerResult[0];

            return inquirer
                .prompt([
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
                    type: 'list',
                    message: 'What role do you want to assign to this employee?',
                    name: 'roles',
                    choices: roles,
                    },
                    {
                    type: 'list',
                    message: 'Who is this employees manager?',
                    name: 'manager',
                    choices: managers,
                    },
                ]) 
            })   
            .then((data) => {
                const query = `
                INSERT INTO employee (firstName, lastName, roleId, managerId)
                VALUES ("${data.firstName}", "${data.lastName}", "${data.roles}", ${data.manager})
                `
                return db.promise().query(query)
            })
            .then(() => {
                console.log(`Employee has been successfully added!`)
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject();
            });
        });
    };

    //!need to fix
    updateEmployeeRole() {
        return new Promise((resolve, reject) => {
            let employeeNames = `
                SELECT firstName, lastName
                FROM employee
            `;

            let roleTitles = `
                SELECT roleTitle
                FROM role
            `
            db.query(employeeNames, function(err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {

                    let employeeChoices = results.map(employee => `${employee.firstName} ${employee.lastName}`);
                    let roleChoices = results.map(role => `${role.roleTitle}`);

                    inquirer.prompt([
                        {
                        type: 'list',
                        message: 'Which employee is switching roles?',
                        name: 'names',
                        choices: employeeChoices,
                        },
                        {
                        type: 'list',
                        message: 'What is the new role for this employee?',
                        name: 'role',    
                        choices: roleChoices,
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
                };
            })
        });
    }
};

module.exports = Employee;