DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    departmentId INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY(departmentId)
);

CREATE TABLE role (
    roleId INT NOT NULL AUTO_INCREMENT,
    roleTitle VARCHAR(30) NOT NULL,
    roleSalary DECIMAL NOT NULL,
    departmentId int NOT NULL,
    PRIMARY KEY(roleId),
    FOREIGN KEY (departmentId) REFERENCES department(departmentId)
);

CREATE TABLE  employee (
    employeeId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    managerId INT,
    PRIMARY KEY(employeeId),
    FOREIGN KEY (roleId) REFERENCES role(roleId),
    FOREIGN KEY (managerId) REFERENCES employee(employeeId)
);