SELECT *
FROM employees
WHERE position = 'Engineer'
  AND year_of_experience <= (
    SELECT 3
  );