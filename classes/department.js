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
};

module.exports = Department;