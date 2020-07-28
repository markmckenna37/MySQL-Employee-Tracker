DROP DATABASE IF EXISTS departmentDB;

CREATE DATABASE departmentDB;

USE departmentDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Good department");

INSERT INTO departments (name)
VALUES ("Bad department");

INSERT INTO departments (name)
VALUES ("Okay department");

SELECT * FROM departments
rsd