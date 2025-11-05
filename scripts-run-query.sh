# This is just for saving. To run you have to manually copy paste each
# line inside the container via bash


# Add Albert
psql -U postgres -d company_db -f /queries/01_add_albert.sql > ./logs/01_add_albert_log.txt

# Update Engineer Salary
psql -U postgres -d company_db -f /queries/02_update_engineer_salary.sql > ./logs/02_update_engineer_salary_log.txt

# Total Salary 2021
psql -U postgres -d company_db -f /queries/03_total_salary_2021.sql > ./logs/03_total_salary_2021_log.txt

# Top 3 Experience
psql -U postgres -d company_db -f /queries/04_top3_experience.sql > ./logs/04_top3_experience_log.txt

# Engineer under 3 Years
psql -U postgres -d company_db -f /queries/05_engineer_under3years.sql > ./logs/05_engineer_under3years_log.txt