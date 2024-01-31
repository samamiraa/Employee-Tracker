const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');


class Department {
    constructor() {};

    viewDepartments() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM department', function (err, results) {
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

    addDepartment() {
        return new Promise((resolve, reject) => {
            inquirer.prompt({
                type: 'input',
                message: 'What is the name of the department you would like to create?',
                name: 'department',
            }) 
            .then((data) => {
                const query = `
                INSERT INTO department (departmentName)
                VALUES ("${data.department}")
                `
                db.query(query, function (err, results) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${data.department} has been successfully added!`);
                        resolve(results);
                    };
                })
            })
        })
    };
};

module.exports = Department;