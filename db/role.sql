DROP DATABASE IF EXISTS roleDB;

CREATE DATABASE roleDB;

USE roleDB;

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id)
VALUES ("Viceroy", 600000.69, 13);

INSERT INTO roles (title, salary, department_id)
VALUES ("Master", 200000.00, 10);

INSERT INTO roles (title, salary, department_id)
VALUES ("Apprentice", 5.00, 10);

SELECT * FROM roles
