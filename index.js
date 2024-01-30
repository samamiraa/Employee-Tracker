const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = require('./assets/db');
const departmentJs = require('./classes/department.js');
const employeeJs = require('./classes/employee.js');
const rolesJs = require('./classes/roles.js');

function inquirerprompt() {
    inquirer
      .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete a role',
            'Delete a department',
            'Delete an employee',
            'Exit'
        ],
      })
      .then((data) => {
        if (data.options === 'View all departments') {
            departmentJs.viewDepartments();
        } else if (data.options === 'View all roles') {
            viewRoles();
        } else if (data.options === 'View all employees') {
            viewEmployees();
        } else if(data.options === 'Add a department') {
            addDepartment();
        } else if (data.options === 'Add a role') {
            addRole();
        } else if (data.options === 'Add an employee') {
            addEmployee();
        } else if (data.options === 'Update an employee role') {
            updateEmployeeRole();
        } else if (data.options === 'Update employee manager') {
            updateEmployeeManager();
        } else if (data.options === 'View employees by manager') {
            viewEmployeeByManager();
        } else if (data.options === 'View employees by department') {
            viewDepartmentsEmployees();
        } else if (data.options === 'Delete a role') {
            deleteRole();
        } else if (data.options === 'Delete a department') {
            deleteDepartment();
        } else if (data.options === 'Delete an employee') {
            deleteEmployee();
        } else {
            return;
        };
    
      })
    };

    inquirerprompt();