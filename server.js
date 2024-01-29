const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maia123!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`),
);

db.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        inquirerprompt();
    }
});

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
        'Exit'
    ],
  })
  .then((data) => {
    if (data.options === 'View all departments') {
        viewDepartments();
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
    } else {
        return;
    }

  })
};

