CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) default NULL,
    salary INT(5) default NULL,
    PRIMARY KEY(id)
);

DESCRIBE employees;

INSERT INTO employees VALUES 
(1, 'john', 1000),
(2, 'charles', 2000),
(3, 'mike', 2500),
(4, 'joe', 3500);


