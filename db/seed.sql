USE employeedb;

INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ('Sofware Engineer', 150000, 1), ('Lead Sofware Engineer', 185000, 1), ('Lawyer', 200000, 3), ('Salesperson', 80000, 4), ('Acountant', 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'McKenna', 1, null), ('John', 'Johnson', 2, 1), ('Nautious', 'Maximus', 3, 1), ('Joan', 'Ark', 2, 2), ('Ludwig', 'VB', 3, null);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
