SELECT SUM(salary) AS total_salary_2021
FROM employees
WHERE EXTRACT(YEAR FROM join_date) <= 2021
  AND (release_date IS NULL OR EXTRACT(YEAR FROM release_date) >= 2021);