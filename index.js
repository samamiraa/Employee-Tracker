//* importing dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//* importing classes
const db = require('./assets/server.js');
const Department = require('./classes/department.js');
const Employee = require('./classes/employee.js');
const Role = require('./classes/role.js');

//* variables for new classes
let department = new Department;
let role = new Role;
let employee = new Employee;

//* inquirer list option choices
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
    'View Department budget',
    'Exit'
];

//* function to invoke database application
function initializeDatabase() {
    //* inquirer initial prompt  
       inquirer
       .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: listOptions,
        })
        //* if statement that calls a function from each class depending on user selection from prompt
        .then((data) => {
            if (data.options === 'View all departments') {
                return department.viewDepartments();
            } else if (data.options === 'View all roles') {
                return role.viewRoles();
            } else if (data.options === 'View all employees') {
                return employee.viewEmployees();
            } else if(data.options === 'Add a department') {
                return department.addDepartment();
            } else if (data.options === 'Add a role') {
                return role.addRole();
            } else if (data.options === 'Add an employee') {
                return employee.addEmployee();
            } else if (data.options === 'Update an employee role') {
                return employee.updateEmployeeRole();
            } else if (data.options === 'Update employee manager') {
                return employee.updateEmployeeManager();
            } else if (data.options === 'View employees by manager') {
                return employee.viewEmployeeByManager();
            } else if (data.options === 'View employees by department') {
                return department.viewDepartmentsEmployees();
            } else if (data.options === 'Delete a role') {
                return role.deleteRole();
            } else if (data.options === 'Delete a department') {
                return department.deleteDepartment();
            } else if (data.options === 'Delete an employee') {
                return employee.deleteEmployee();
            } else if (data.options === 'View Department budget') {
                return department.viewBudget();
            } else {
                console.log('Diconnected from database');
                process.exit();
            };
        })
        //* gives option to go back to main menu or exit
        .then(() => {
            goBack();
        })
        //* catches error if any
        .catch((err) => {
            console.error(err);
        })
};

function goBack() {
    //* prompts user to go back to main menu or exit
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
            //* either calls function to go back to main menu or exits depending on user selection
            if (data.back === 'Back') {
                initializeDatabase();
            } else {
                console.log('Diconnected from database');
                process.exit();
            };
        });
};

//* calls function to start database application
initializeDatabase();


