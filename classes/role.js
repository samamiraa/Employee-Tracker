const db = require('../assets/server.js');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const validator = require('validator');

class Role {
    constructor() {};

    viewRoles() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT role.roleId, role.roleTitle, role.roleSalary, department.departmentName
                FROM role
                INNER JOIN department ON role.departmentId = department.departmentId;
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

    async addRole() {
        try {
            const departmentQuery = `
                SELECT departmentName
                FROM department
            `;

            const departmentNames = await db.promise().query(departmentQuery);

            await inquirer.prompt([
                {
                type: 'input',
                message: 'What is the title of the role you would like to create?',
                name: 'roleTitle',
                },
                {
                type: 'input',
                message: 'What is the annual salary of this new role?',
                name: 'roleSalary',    
                },
                {
                type: 'list',
                message: 'What department does this role belong to?',
                name: 'department',
                choices: departmentNames,  
                },
            ]);
            
            const departmentIdQuery = `
            SELECT departmentId
            FROM department
            WHERE departmentName = '${departmentChoices.departmentName}'
            `;

            const departmentData = await db.promise().query(departmentIdQuery);
            const addRoleQuery = `
                INSERT INTO role (roleTitle, roleSalary, departmentId)
                VALUES ("${data.roleTitle}", "${data.roleSalary}", "${departmentData[0].departmentId}")
                `;

            await db.promise().query(addRoleQuery);
            console.log(`${data.roleTitle} has been successfully added!`)

        } catch (err) {
            console.error(err);
        };
    };
};

module.exports = Role;