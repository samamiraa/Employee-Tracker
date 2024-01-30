const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = require('./assets/server.js');
const Department = require('./classes/department.js');
const Employee = require('./classes/employee.js');
const Roles = require('./classes/roles.js');

const listOptions = [
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
];

function inquirerprompt() {
    inquirer
      .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: listOptions,
      })
      .then((data) => {
        if (data.options === 'View all departments') {
            let viewDepartments = new Department;
            viewDepartments.viewDepartments();
        } else if (data.options === 'View all roles') {
            let viewRoles = new Roles;
            viewRoles.viewRoles();
        } else if (data.options === 'View all employees') {
            let viewEmployees = new Employee;
            viewEmployees.viewEmployees();
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