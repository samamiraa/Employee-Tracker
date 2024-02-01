const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

class Employee {
    constructor() {};

    //! not getting all employees
    viewEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT employee.employeeId, employee.firstName, employee.lastName, role.roleTitle, role.roleSalary, department.departmentName, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
                FROM employee
                INNER JOIN role ON employee.roleId = role.roleId
                INNER JOIN department ON role.departmentId = department.departmentId
                INNER JOIN employee manager ON manager.employeeId = employee.managerId;
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

    //!need to add who employee manager is 
    addEmployee() {
        return new Promise((resolve, reject) => {
            const roleQuery = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `

            const rmanagerQuery = `
            SELECT roleTitle AS name, roleId AS value
            FROM role
        `
        return db.promise().query(roleQuery)
            .then(roles => {
            console.log(roles);

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
                    choices: roles[0],
                    },
                    {
                    type: 'list',
                    message: 'Who is this employees manager?',
                    name: 'roles',
                    choices: roles[0],
                    },
                ]) 
            })   
            .then((data) => {
                const query = `
                INSERT INTO employee (firstName, lastName, roleId)
                VALUES ("${data.firstName}", "${data.lastName}", "${data.roles}")
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