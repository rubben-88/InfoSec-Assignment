#!/bin/bash

# Location of Output File
output_file="overview_db.txt"

# PostgreSQL credentials
username="postgres"
password="postgres"
database="infosec"

# Function to empty the Text File
empty_file() {
    if [ -f "$output_file" ]; then
    # Empty the file by redirecting an empty string to it
    > "$output_file"
    fi
}

# Function to execute SQL queries
execute_query() {
    query="$1"
    sudo -u $username psql -d $database -c "$query" 2>/dev/null
}

# Function to get info and the data of every table
info_tables() {
    tables=$(execute_query "
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    " | awk '{print $1}')

    counter=0

    amount=0
    for table in $tables; do
        ((amount++))
    done

    for table in $tables; do

        # Increment counter
        ((counter++))
        
        # Skip first two iterations
        if [ $counter -le 2 ]; then
            continue
        fi

        # Skip last iteration
        if [ $counter -eq $amount ]; then
            break
        fi

        echo "=== TABLE $table ===" 
        execute_query "\d+ \"$table\""
        execute_query "SELECT * FROM \"$table\""
        echo 
    done
}

# Function to get overview of the database
get_database_overview() {
    echo "==============================================================" 
    echo "=== DATABASE OVERVIEW ========================================" 
    echo "=============================================================="
    echo
    echo "1. List of tables:" 
    execute_query "\dt+"
    echo "2. List of views:" 
    execute_query "\dv"
    echo "3. List of sequences:" 
    execute_query "\ds"
    echo "4. List of functions:" 
    execute_query "\df"
    echo "5. List of indexes:" 
    execute_query "\di"
    echo "6. List of triggers:" 
    execute_query "\dtr"
}

# Main function
main() {
    empty_file
    get_database_overview >> $output_file
    echo >> $output_file
    echo >> $output_file
    echo >> $output_file
    info_tables >> $output_file
    echo "Done!"
}

# Execute the main function
main
