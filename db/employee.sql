DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "McKenna", 69, 6);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Karen", "Karenson", 456);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Biggus", "Dickus", 88, 1);

SELECT * FROM employees
