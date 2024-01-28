INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Deli"),
        (3, "Produce"),
        (4, "Bakery"),
        (5, "Meat");

INSERT INTO role (id, title, salary, department_id)
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

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES  (1, "Ricardo", "Larkin", 1),
        (2, "Courtney", "Powlowski", 1),
        (3, "Rex", "Mohr", 1),
        (4, "Shyanne", "Weimann", 2),
        (5, "Donna", "Veum", 3),
        (6, "Dillan", "Lueilwitz", 3),
        (7, "Nia", "Collins", 3),
        (8, "Carlos", "Windler", 4),
        (9, "Windler", "Senger", 4),
        (10, "Jovani", "Nader", 5),
        (11, "Derek", "Conroy", 6),
        (12, "Deron", "Koelpin", 6),
        (13, "Eve", "McGlynn", 6),
        (14, "Doug", "Mante", 7),
        (15, "Lottie", "Feest", 8),
        (16, "Bernie", "Blanda", 8),
        (17, "Marques", "Volkman", 8),
        (18, "Hardy", "Feeney", 9),
        (19, "Peggie", "Kemmer", 10),
        (20, "Adele", "Swaniawski", 10),
        (21, "Bailee", "Metz", 10),
        (22, "Levi", "Ankunding", 11);

UPDATE employee
SET manager_id = 4
WHERE role_id = 1;

UPDATE employee
SET manager_id = 10
WHERE role_id = 3;

UPDATE employee
SET manager_id = 10
WHERE role_id = 4;

UPDATE employee
SET manager_id = 14
WHERE role_id = 6;

UPDATE employee
SET manager_id = 18
WHERE role_id = 8;

UPDATE employee
SET manager_id = 22
WHERE role_id = 10;

UPDATE employee
SET manager_id = NULL
WHERE id = 4;

UPDATE employee
SET manager_id = NULL
WHERE id = 10;

UPDATE employee
SET manager_id = NULL
WHERE id = 14;

UPDATE employee
SET manager_id = NULL
WHERE id = 18;

UPDATE employee
SET manager_id = NULL
WHERE id = 22;
