DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    departmentId INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(departmentId)
);

CREATE TABLE role (
    roleId INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY(roleId),
    FOREIGN KEY department(departmentId)
    REFERENCES department(id)
);

CREATE TABLE  employee (
    employeeId INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(employeeId),
    FOREIGN KEY role(roleId)
    REFERENCES role(id)
);