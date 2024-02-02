//* imports dependancies
const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');


class Department {
    constructor() {};

    viewDepartments() {
        return new Promise((resolve, reject) => {
            //* SQL syntax to select all department info
            return db.promise().query('SELECT * FROM department')
            .then((data) => {
                //* displays department info in table
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

    addDepartment() {
        return new Promise((resolve, reject) => {
            //* prompts user for name of new department
            return inquirer.prompt({
                type: 'input',
                message: 'What is the name of the department you would like to create?',
                name: 'department',
                validate: (input) => {
                    //* checks to see if length matches criteria
                    if (!validator.isLength(input, { min: 1, max: 30})) {
                        return 'Department name must be 1 - 30 characters';
                    } else {
                         return true;
                    };
                },
            }) 
            .then((data) => {
                //* SQL syntax to add new department 
                const query = `
                INSERT INTO department (departmentName)
                VALUES ("${data.department}")
                `
                //* executes query to sql database
                db.promise().query(query)
                .then(() => {
                    //* displays confirmation message
                    console.log(`Department has been successfully added!`)
                    resolve();
                })
                //* displays error if any
                .catch((err) => {
                    console.error(err);
                    reject();
                });
            })
        })
    };

    viewDepartmentsEmployees() {
        return new Promise((resolve, reject) => {
            let departments;

            //* SQL syntax to get department info
            const departmentQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            //* executes query to sql database
            return db.promise().query(departmentQuery)
            .then((departmentResult) =>{
                departments = departmentResult[0];

                //* prompts user for which departments team 
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which departments team would you like to see?',
                    name: 'departments',    
                    choices: departments,
                    },
                ]) 
            })
            .then((data) => {
                //* SQL syntax to get employee info
                const query = `
                    SELECT employeeId AS employeeId, CONCAT(firstName, ' ', lastName) AS employeeName, role.roleTitle, role.roleSalary
                    FROM employee 
                    INNER JOIN role ON employee.roleId = role.roleId
                    WHERE role.departmentId = ${data.departments}; 
                `;

                //* executes query to sql database
                return db.promise().query(query);
            })
            .then((data) => {
                //* displays employee info for speific deparrt in table
                console.table(data[0]);
                resolve(data);
            })
            //* displays error if any
            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    };

    deleteDepartment() {
        return new Promise ((resolve, reject) => {
            let departments;

            //* SQL syntax to get department info
            const departmentsQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            //* executes query to sql database
            return db.promise().query(departmentsQuery)
            .then((departmentsResult) => {
                departments = departmentsResult[0];

                //* prompts user for which department to be deleted
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which department would you like to delete?',
                    name: 'departments',    
                    choices: departments,
                    },
                ]) 
            })
            .then((data) => {
                //* SQL syntax to delete department selected by user
                const query = `
                    DELETE FROM department
                    WHERE departmentId = ${data.departments}
                `;

                //* executes query to sql database
                return db.promise().query(query);
            })
            .then(() => {
                //* confirmation message 
                console.log('Department successfully deleted!')
                resolve();
            })
            //* displays error if any
            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    };

    viewBudget() {
        return new Promise ((resolve, reject) => {
            let departments;

            //* SQL syntax to get department info 
            const departmentsQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            //* executes query to sql database
            return db.promise().query(departmentsQuery)
            .then((departmentsResult) => {
                departments = departmentsResult[0];

                //* prompts user for which departments budget
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: 'Which departments budget would you like to view?',
                    name: 'departments',    
                    choices: departments,
                    },
                ]) 
            })
            .then((data) => {
                //* SQL syntax to add salaries together to get budgets salary
                const query = `
                    SELECT SUM(role.roleSalary) as totalBudget
                    FROM role
                    INNER JOIN department ON role.departmentId = department.departmentId
                    WHERE department.departmentId = ${data.departments};
                `;

                //* executes query to sql database
                return db.promise().query(query)
                .then((data) => {
                    //* displays added budget in table
                    console.table(data[0]);
                    resolve();
                })
                //* displays error if any
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
            })
        });
    };
};

//* exports class
module.exports = Department;