INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Deli"),
        (3, "Produce"),
        (4, "Bakery"),
        (5, "Meat")

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
        (11, "Meat Departmente Manager", 50000.00, 5)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Ricardo", "Larkin", 1, 4),
        (2, "Courtney", "Powlowski", 1, 4),
        (3, "Rex", "Mohr", 1, 4),
        (4, "Shyanne", "Weimann", 2, NULL),
        (5, "Donna", "Veum", 3, 10),
        (6, "Dillan", "Lueilwitz", 3, 10),
        (7, "Nia", "Collins", 3, 10),
        (8, "Carlos", "Windler", 4, 10),
        (9, "Windler", "Senger", 4, 10),
        (10, "Jovani", "Nader", 5, NULL),
        (11, "Derek", "Conroy", 6, 14),
        (12, "Deron", "Koelpin", 6, 14),
        (13, "Eve", "McGlynn", 6, 14),
        (14, "Doug", "Mante", 7, NULL),
        (15, "Lottie", "Feest", 8, 18),
        (16, "Bernie", "Blanda", 8, 18),
        (17, "Marques", "Volkman", 8, 18),
        (18, "Hardy", "Feeney", 9, NULL),
        (19, "Peggie", "Kemmer", 10, 22),
        (20, "Adele", "Swaniawski", 10, 22),
        (21, "Bailee", "Metz", 10, 22),
        (22, "Levi", "Ankunding", 11, NULL)


