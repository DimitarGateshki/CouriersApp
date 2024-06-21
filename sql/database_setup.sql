CREATE DATABASE kurierska_firma;

USE kurierska_firma;

CREATE TABLE naseleni_mesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    oblast VARCHAR(255) NOT NULL,
    obshtina VARCHAR(255) NOT NULL,
    poshtenski_kod INT NOT NULL
);

CREATE TABLE ofisi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manager VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone INT(10) NOT NULL,
    working_hours VARCHAR(50) NOT NULL,
    naseleno_myasto_id INT,
    FOREIGN KEY (naseleno_myasto_id) REFERENCES naseleni_mesta(id)
);

CREATE TABLE kurieri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    personal_number INT(20) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone INT(10) NOT NULL,
    office_id INT,
    FOREIGN KEY (office_id) REFERENCES ofisi(id)
);

CREATE TABLE avtomobili (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marka VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    reg_number VARCHAR(20) NOT NULL,
    fuel_consumption DECIMAL(5,2) NOT NULL,
    kurier_id INT,
    office_id INT,
    FOREIGN KEY (kurier_id) REFERENCES kurieri(id),
    FOREIGN KEY (office_id) REFERENCES ofisi(id)
);

INSERT INTO naseleni_mesta (name, oblast, obshtina, poshtenski_kod) VALUES
('Sofia', 'Sofia', 'Sofia City', 1000),
('Plovdiv', 'Plovdiv', 'Plovdiv City', 4000),
('Varna', 'Varna', 'Varna City', 9000),
('Burgas', 'Burgas', 'Burgas City', 8000),
('Ruse', 'Ruse', 'Ruse City', 7000);

INSERT INTO ofisi (name, manager, address, phone, working_hours, naseleno_myasto_id) VALUES
('Office 1', 'Manager 1', 'Address 1', 0888123456, '9:00-18:00', 1),
('Office 2', 'Manager 2', 'Address 2', 0888123457, '9:00-18:00', 2),
('Office 3', 'Manager 3', 'Address 3', 0888123458, '9:00-18:00', 3),
('Office 4', 'Manager 4', 'Address 4', 0888123459, '9:00-18:00', 4),
('Office 5', 'Manager 5', 'Address 5', 0888123460, '9:00-18:00', 5);

INSERT INTO kurieri (personal_number, username, password, full_name, phone, office_id) VALUES
(12345, 'kurier1', 'password1', 'Kurier 1', 0888123401, 1),
(12346, 'kurier2', 'password2', 'Kurier 2', 0888123402, 2),
(12347, 'kurier3', 'password3', 'Kurier 3', 0888123403, 3),
(12348, 'kurier4', 'password4', 'Kurier 4', 0888123404, 4),
(12349, 'kurier5', 'password5', 'Kurier 5', 0888123405, 5);

INSERT INTO avtomobili (marka, model, reg_number, fuel_consumption, kurier_id, office_id) VALUES
('Toyota', 'Corolla', 'CA1234AB', 6.5, 1, 1),
('Honda', 'Civic', 'CB5678CD', 7.0, 2, 2),
('Ford', 'Focus', 'CC9101EF', 7.2, 3, 3),
('BMW', '3 Series', 'CD2345GH', 8.5, 4, 4),
('Audi', 'A4', 'CE6789IJ', 8.0, 5, 5);


-- Function
DELIMITER //
CREATE FUNCTION calculate_total_fuel_consumption(office_id INT) RETURNS DECIMAL(10,2)
BEGIN
    DECLARE total_fuel DECIMAL(10,2);
    SELECT SUM(fuel_consumption) INTO total_fuel FROM avtomobili WHERE office_id = office_id;
    RETURN total_fuel;
END //
DELIMITER ;

-- Procedure
DELIMITER //
CREATE PROCEDURE get_office_summary(IN office_id INT)
BEGIN
    SELECT o.name AS office_name, o.manager, o.address, o.phone, o.working_hours,
           (SELECT COUNT(*) FROM kurieri WHERE office_id = o.id) AS kurieri_count,
           (SELECT COUNT(*) FROM avtomobili WHERE office_id = o.id) AS avtomobili_count,
           calculate_total_fuel_consumption(o.id) AS total_fuel_consumption
    FROM ofisi o
    WHERE o.id = office_id;
END //
DELIMITER ;

-- View
CREATE VIEW office_details AS
SELECT o.id AS office_id, o.name AS office_name, o.manager, o.address, o.phone, o.working_hours,
       n.name AS naseleno_myasto, n.oblast, n.obshtina, n.poshtenski_kod
FROM ofisi o
JOIN naseleni_mesta n ON o.naseleno_myasto_id = n.id;
