const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');


class Department {
    constructor() {};

    viewDepartments() {
        return new Promise((resolve, reject) => {
            return db.promise().query('SELECT * FROM department')
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

    addDepartment() {
        return new Promise((resolve, reject) => {
            return inquirer.prompt({
                type: 'input',
                message: 'What is the name of the department you would like to create?',
                name: 'department',
            }) 
            .then((data) => {
                const query = `
                INSERT INTO department (departmentName)
                VALUES ("${data.department}")
                `
                db.promise().query(query)
                .then(() => {
                    console.log(`Department has been successfully added!`)
                    resolve();
                })
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

            const departmentQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            return db.promise().query(departmentQuery)
            .then((departmentResult) =>{
                departments = departmentResult[0];

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
                const query = `
                    SELECT employeeId AS employeeId, CONCAT(firstName, ' ', lastName) AS employeeName, role.roleTitle, role.roleSalary
                    FROM employee 
                    INNER JOIN role ON employee.roleId = role.roleId
                    WHERE role.departmentId = ${data.departments}; 
                `;

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

    deleteDepartment() {
        return new Promise ((resolve, reject) => {
            let departments;

            const departmentsQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            return db.promise().query(departmentsQuery)
            .then((departmentsResult) => {
                departments = departmentsResult[0];

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
                const query = `
                    DELETE FROM department
                    WHERE departmentId = ${data.departments}
                `;

                return db.promise().query(query);
            })
            .then(() => {
                console.log('Department successfully deleted!')
                resolve();
            })

            .catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    };

    viewBudget() {
        return new Promise ((resolve, reject) => {
            let departments;

            const departmentsQuery = `
                SELECT departmentName AS name, departmentId AS value
                FROM department
            `;

            return db.promise().query(departmentsQuery)
            .then((departmentsResult) => {
                departments = departmentsResult[0];

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
                const query = `
                    SELECT SUM(role.roleSalary) as totalBudget
                    FROM role
                    INNER JOIN department ON role.departmentId = department.departmentId
                    WHERE department.departmentId = ${data.departments};
                `;

                return db.promise().query(query)
                .then((data) => {
                    console.table(data[0]);
                    resolve();
                })
    
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
            })
        });
    };
};

module.exports = Department;