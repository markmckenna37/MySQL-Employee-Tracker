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


CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "McKenna", 69, 6), ("Karen", "Karenson", 456), ("Biggus", "Dickus", 88, 1);


INSERT INTO roles (title, salary, department_id)
VALUES ("Viceroy", 600000.69, 13), ("Master", 200000.00, 10), ("Apprentice", 5.00, 10);


INSERT INTO departments (name)
VALUES ("Good department"), ("Bad department"), ("Okay department");


