--  **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role 
-- belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee 
-- that manages the employee being Created. This field may be null 
-- if the employee has no manager  

DROP DATABASE IF EXISTS company_db; 

CREATE DATABASE company_db

USE company_db

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT NOT NULL; 
    name VARCHAR(30)
    PRIMARY KEY (id)
); 

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT NOT NULL; 
    title VARCHAR(30)
    salary DECIMAL
    department_id INT 
    PRIMARY KEY (id)
);

CREATE TABLE employe(
    id INTEGER AUTO_INCREMENT NOT NULL; 
    first_name VARCHAR(50)
    last_name VARCHAR(50)
    role_id INT
    manager_id INT
    PRIMARY KEY (id)
); 
