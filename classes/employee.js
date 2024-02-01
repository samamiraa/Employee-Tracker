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
                    validate: (input) => {
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

    updateEmployeeRole() {
        return new Promise((resolve, reject) => {
            let roles;
            let employees;

            const employeeNames = `
                SELECT CONCAT(firstName, ' ', lastName) AS name, employeeId AS value
                FROM employee
            `;

            const roleTitles = `
                SELECT roleTitle AS name, roleId AS value
                FROM role
            `
            return Promise.all([db.promise().query(employeeNames), db.promise().query(roleTitles)])
                .then(([employeeResult, rolesResult]) => {
                    roles = rolesResult[0];
                    employees = employeeResult[0];

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
                    const query = `
                    UPDATE employee 
                    SET roleId = ${data.roles}
                    WHERE employeeId = "${data.employees}";
                    `
                    return db.promise().query(query);
                })
                .then(() => {
                    console.log(`Employee role has been successfully updated!`)
                    resolve();
                })
    
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
                LEFT JOIN employee manager ON manager.employeeId = employee.managerId;
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
                    WHERE managerId = ${data.managers} OR managerId IS null;
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