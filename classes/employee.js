//* imports dependancies
const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

//* class that contains functions related to employees
class Employee {
    constructor() {};

    //* function to view all employees
    viewEmployees() {
        return new Promise((resolve, reject) => {
            //* SQL syntax to get employee info from employee table, role info from role table, department info from department table using join functions
            //* made possible by primary & foreign keys defined in schema
            const query = `
                SELECT employee.employeeId, employee.firstName, employee.lastName, role.roleTitle, role.roleSalary, department.departmentName, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
                FROM employee
                INNER JOIN role ON employee.roleId = role.roleId
                INNER JOIN department ON role.departmentId = department.departmentId
                LEFT JOIN employee manager ON manager.employeeId = employee.managerId;
            `
            //* makes query to SQL database
            return db.promise().query(query)
            .then((data) => {
                //* displays info rec'd from database
                console.table(data[0]);
                //* resolves promise
                resolve();
            })
            //* catches errors and displays if any
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

            //* SQL syntax to get role info from role table
            const roleQuery = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `

            //* SQL syntax to get all current employees who are managers
            const managerQuery = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
                WHERE managerId IS NULL
                UNION
                SELECT 'None' AS name, null AS value;
            `;

            //* performs both queries at once before proceeding to inquirer prompt
        return Promise.all([db.promise().query(roleQuery), db.promise().query(managerQuery)])
            .then(([rolesResult, managerResult]) => {
            //* sets variables value as data rec'd from database
            roles = rolesResult[0];
            managers = managerResult[0];

            //* prompts user for new employee info
            return inquirer
                .prompt([
                    {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name: 'firstName',
                    validate: (input) => {
                        //* checks user input for characyer length
                        if (!validator.isLength(input, { min: 1, max: 30})) {
                            return 'First name must be 1 - 30 characters';
                        } else {
                             return true;
                        };
                    },
                    },
                    {
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                    name: 'lastName', 
                    validate: (input) => {
                        if (!validator.isLength(input, { min: 1, max: 30})) {
                            return 'Last name must be 1 - 30 characters';
                        } else {
                             return true;
                        };
                    },   
                    },
                    {
                    //* displays list of roles as options rec'd from role info query
                    type: 'list',
                    message: 'What role do you want to assign to this employee?',
                    name: 'roles',
                    choices: roles,
                    },
                    {
                    //* displays list of current managers as options from manager info query 
                    type: 'list',
                    message: 'Who is this employees manager?',
                    name: 'manager',
                    choices: managers,
                    },
                ]) 
            })   
            .then((data) => {
                //* SQL syntax to insert employee info from user input to database
                const query = `
                INSERT INTO employee (firstName, lastName, roleId, managerId)
                VALUES ("${data.firstName}", "${data.lastName}", "${data.roles}", ${data.manager})
                `
                return db.promise().query(query)
            })
            .then(() => {
                //* confirmation message add employee successful
                console.log(`Employee has been successfully added!`)
                resolve();
            })
            //* displays error if any
            .catch((err) => {
                console.error(err);
                reject();
            });
        });
    };

    updateEmployeeRole() {
        return new Promise((resolve, reject) => {
            let roles;
            let employees;

            //* SQL syntax to get employee name and id
            const employeeNames = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
            `;

            //* SQL syntax to get role title and id
            const roleTitles = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `
            //*performs all queries at once before proceeding to inquirer prompt
            return Promise.all([db.promise().query(employeeNames), db.promise().query(roleTitles)])
                .then(([employeeResult, rolesResult]) => {
                    //* sets variables value as data rec'd from database
                    roles = rolesResult[0];
                    employees = employeeResult[0];

                    //* prompts user for new employee role with choices from sql queries
                    return inquirer.prompt([
                        {
                        type: 'list',
                        message: 'Which employee is switching roles?',
                        name: 'employees',
                        choices: employees,
                        },
                        {
                        type: 'list',
                        message: 'What is the new role for this employee?',
                        name: 'roles',    
                        choices: roles,
                        },
                    ]) 
                })
                .then((data) => {
                    //* SQL syntax to update employee role
                    const query = `
                    UPDATE employee 
                    SET roleId = ${data.roles}
                    WHERE employeeId = "${data.employees}";
                    `
                    return db.promise().query(query);
                })
                .then(() => {
                    //* confirmation message employee role update successful
                    console.log(`Employee role has been successfully updated!`)
                    resolve();
                })
                //* displays error if any
                .catch((err) => {
                    console.error(err);
                    reject();
                });
            });
    };

    updateEmployeeManager() {
        return new Promise((resolve, reject) => {
            let managers;
            let employees;

            const employeeQuery = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
                `;

            const managerQuery = `
                SELECT DISTINCT CONCAT(manager.firstName, ' ', manager.lastName) AS name, manager.employeeId AS value
                FROM employee
                LEFT JOIN employee manager ON manager.employeeId = employee.managerId;
            `
            return Promise.all([db.promise().query(employeeQuery), db.promise().query(managerQuery)])
            .then(([employeeResult, managerResult]) => {
                employees = employeeResult[0];
                managers = managerResult[0];

                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which employee needs to update their current manager?',
                    name: 'employees',
                    choices: employees,
                    },
                    {
                    type: 'list',
                    message: 'Who is their new manager?',
                    name: 'managers',    
                    choices: managers,
                    },
                ]) 
            })
            .then((data) => {
                const query = `
                    UPDATE employee
                    SET managerId = ${data.managers}
                    WHERE employeeId = ${data.employees};
                `

                return db.promise().query(query);
            })
            .then(() => {
                console.log(`Employee manager has been successfully updated!`)
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject();
            });

        });

    };

    viewEmployeeByManager() {
        return new Promise((resolve, reject) => {
            let managers;

            const managerQuery = `
                SELECT DISTINCT CONCAT(manager.firstName, ' ', manager.lastName) AS name, manager.employeeId AS value
                FROM employee
                INNER JOIN employee manager ON manager.employeeId = employee.managerId;
            `;

            return db.promise().query(managerQuery)
            .then((managerResult) => {
                managers = managerResult[0];

                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which managers team would you like to see?',
                    name: 'managers',    
                    choices: managers,
                    },
                ]) 
            })
            .then((data) => {
                const query = `
                    SELECT employeeId AS employeeId, CONCAT(firstName, ' ', lastName) AS employeeName, role.roleTitle, role.roleSalary, department.departmentName
                    FROM employee 
                    INNER JOIN role ON employee.roleId = role.roleId
                    INNER JOIN department ON role.departmentId = department.departmentId
                    WHERE managerId = ${data.managers} ;
                `
                return db.promise().query(query);
            })
            .then((data) => {
                console.table(data[0]);
                resolve(data);
            })

            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    };

    deleteEmployee() {
        return new Promise ((resolve, reject) => {
            let employees;

            const employeesQuery = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
            `;

            return db.promise().query(employeesQuery)
            .then((employeesResult) => {
                employees = employeesResult[0];

                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which employee would you like to delete?',
                    name: 'employees',    
                    choices: employees,
                    },
                ]) 
            })
            .then((data) => {
                const query = `
                    DELETE FROM employee
                    WHERE employeeId = ${data.employees}
                `;

                return db.promise().query(query);
            })
            .then(() => {
                console.log('Employee successfully deleted!')
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
};

module.exports = Employee;