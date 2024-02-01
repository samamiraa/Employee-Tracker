const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = require('./assets/server.js');
const Department = require('./classes/department.js');
const Employee = require('./classes/employee.js');
const Role = require('./classes/role.js');

let department = new Department;
let role = new Role;
let employee = new Employee;

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

function initializeApp() {
       inquirer
       .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: listOptions,
        })
        .then((data) => {
            if (data.options === 'View all departments') {
                department.viewDepartments();
                goBack()
            } else if (data.options === 'View all roles') {
                return role.viewRoles();
            } else if (data.options === 'View all employees') {
                employee.viewEmployees();
                goBack()
            } else if(data.options === 'Add a department') {
                department.addDepartment();
                goBack()
            } else if (data.options === 'Add a role') {
                return role.addRole();
            } else if (data.options === 'Add an employee') {
                employee.addEmployee();
            } else if (data.options === 'Update an employee role') {
                employee.updateEmployeeRole();
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
                console.log('Diconnected from database');
                process.exit();
            };
        })
        .then(() => {
            goBack();
        })
        .catch((err) => {
            console.error(err);
        })
};

function goBack() {
    inquirer
    .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'back',
        choices: [
            'Back',
            'Exit'
        ],
        })
        .then((data) => {
            if (data.back === 'Back') {
                initializeApp();
            } else {
                console.log('Diconnected from database');
                process.exit();
            };
        });
};

initializeApp();


