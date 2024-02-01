INSERT INTO department (departmentId, departmentName)
VALUES  (1, "Sales"),
        (2, "Deli"),
        (3, "Produce"),
        (4, "Bakery"),
        (5, "Meat");

INSERT INTO role (roleId, roleTitle, roleSalary, departmentId)
VALUES  (1, "Cashier", 30000.00, 1),
        (2, "Sales Department Manager", 50000.00, 1),
        (3, "Deli Food Service Assistant", 30000.00, 2),
        (4, "Meat Cutter", 40000.00, 2),
        (5, "Deli Department Manager", 50000.00, 2),
        (6, "Produce Stocker", 30000.00, 3),
        (7, "Produce Department Manager", 50000.00, 3),
        (8, "Baker", 40000.00, 4),
        (9, "Bakery Department Manager", 50000.00, 4),
        (10, "Butcher", 40000.00, 5),
        (11, "Meat Departmente Manager", 50000.00, 5);

INSERT INTO employee (employeeId, firstName, lastName, roleId)
VALUES  (1, "Ricardo", "Larkin", 1),
        (2, "Courtney", "Powlowski", 1),
        (3, "Rex", "Mohr", 2),
        (4, "Shyanne", "Weimann", 3),
        (5, "Donna", "Veum", 3),
        (6, "Dillan", "Lueilwitz", 4),
        (7, "Nia", "Collins", 5),
        (8, "Carlos", "Windler", 6),
        (9, "Windler", "Senger", 6),
        (10, "Jovani", "Nader", 7),
        (11, "Derek", "Conroy", 8),
        (12, "Deron", "Koelpin", 8),
        (13, "Eve", "McGlynn", 9),
        (14, "Doug", "Mante", 10),
        (15, "Lottie", "Feest", 10),
        (16, "Bernie", "Blanda", 11);

UPDATE employee
SET managerId = 3
WHERE roleId = 1;

UPDATE employee
SET managerId = 5
WHERE roleId = 3;

UPDATE employee
SET managerId = 5
WHERE roleId = 4;

UPDATE employee
SET managerId = 10
WHERE roleId = 6;

UPDATE employee
SET managerId = 13
WHERE roleId = 8;

UPDATE employee
SET managerId = 16
WHERE roleId = 10;

UPDATE employee
SET managerId = NULL
WHERE employeeId = 3;

UPDATE employee
SET managerId = NULL
WHERE employeeId = 7;

UPDATE employee
SET managerId = NULL
WHERE employeeId = 10;

UPDATE employee
SET managerId = NULL
WHERE employeeId = 13;

UPDATE employee
SET managerId = NULL
WHERE employeeId = 16;
