INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Deli"),
        (3, "Produce"),
        (4, "Bakery"),
        (5, "Meat"),

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Cashier", 30000.00, 1),
        (2, "Sales Manager", 50000.00, 1),
        (3, "Deli Food Service Assistant", 30000.00, 2),
        (4, "Meat Cutter", 40000.00, 2),
        (5, "Deli Manager", 50000.00, 2),
        (6, "Produce Stocker", 30000.00, 3),
        (7, "Produce Manager", 50000.00, 3),
        (8, "Baker", 40000.00, 4),
        (9, "Bakery Manager", 50000.00, 4),
        (10, "Butcher", 40000.00, 5),
        (11, "Meat Departmente Manager", 50000.00, 5)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES