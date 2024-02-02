/* deletes database if exist already*/
DROP DATABASE IF EXISTS company_db;
/*creates database*/
CREATE DATABASE company_db;

/*makes it so this database is being used*/
USE company_db;

/*creates tables with defined properties, creates links between tables using keys*/
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