
-- Table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(100),
    join_date DATE,
    release_date DATE,
    year_of_experience DECIMAL(4,1),
    salary DECIMAL(10,2)
);

-- default value from provided image Table
INSERT INTO employees (name, position, join_date, release_date, year_of_experience, salary) VALUES
('Jacky', 'Solution Architect', '2018-07-25', '2022-07-25', 8, 150.00),
('John', 'Assistant Manager', '2016-02-02', '2021-02-02', 12, 155.00),
('Alano', 'Manager', '2010-11-09', NULL, 14, 175.00),
('Aaron', 'Engineer', '2021-08-16', '2022-08-16', 1, 80.00),
('Allen', 'Engineer', '2024-06-06', NULL, 4, 75.00),
('Peter', 'Team Leader', '2020-01-09', NULL, 3, 85.00);