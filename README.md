# InfoSec-Assignment
Information Security Assignment: Securing Web-Based Electronic Elections

## Project setup

1. Clone the repository to your local machine using the following command:
    ```
    git clone https://github.ugent.be/ruvdamme/InfoSec-Assignment
    ```
## Backend

The backend utilizes Python 3.12.

#### I) Setup:


1. Navigate to the backend directory:
    ```
    cd InfoSec-Assignment/backend
    ```
    
2. Start the Python virtual environment:

    **Linux**
    ```
    python3 -m venv venv
    source venv/bin/activate
    ```
    **Windows**
    ```
    .\venv\Scripts\activate.bat
    ```
3. Install the required Python packages using the `requirements.txt` file:
    ```
    pip install -r requirements.txt
    ```
4. Install PostgreSQL:

    **Ubuntu**
    ```
    sudo apt-get install postgresql postgresql-contrib
    ```
    **Fedora**
    ```
    sudo dnf install postgresql postgresql-server
    sudo postgresql-setup --initdb --unit postgresql
    sudo systemctl enable --now postgresql
    ```
    **Arch**
    ```
    sudo pacman -S postgresql
    sudo su - postgres -c "initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data'"
    sudo systemctl start postgresql.service
    sudo systemctl enable postgresql.service
    ```
    **Windows**
    ```
    https://www.postgresql.org/download/windows/
    ```
    (Don't forget to add the bin folder to PATH.)
5. Create a new database named `infosec` and set the default password:
    **Linux**
    ```
    sudo -u postgres psql -c "CREATE DATABASE infosec;"
    sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
    ```
    **Windows**
    ```
    psql -U postgres -c "CREATE DATABASE infosec;"
    ```
6. Execute the `fill_database_mock.py` script to populate the database with mock data:
    ```
    python fill_database_mock.py
    ```
7. Start the API by running the `app.py` script:
    ```
    python app.py
    ```
\
#### II) Database Info:

1. Quick general overview (linux only):
	```
	bash overview_db.sh
	```

2. More specific:
	
	1. Enter the postgres command interface:

        **Linux**
		```
		sudo -u postgres psql
		```
        **Windows**
		```
		psql -U postgres
		```
	2. Connect to the `infosec` database:
		```
		\c infosec
		```
	3. See the tables:
		```
		\dt+
		```
	4. Specific table info (escaping needed for capital letters):
		```
		\d+ "TableName"
		```
	5. Specific table data contents:
		```
		SELECT * from "TableName";
		```
	

#### III) API endpoints:

1. Go to an URL like
	```
	http://127.0.0.1:8000/candidates
	```

	Don't forget to replace spaces in a URL by %20!


## Frontend

The frontend utilizes Node.js and React.
Follow these steps to set up the project's frontend:

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Download the necessary node modules:
    ```bash
    npm install
    ```

3. Run the frontend locally:
    ```bash
    npm start
    ```
    The frontend should now open automatically in your browser.
4. In case of a CORS error, please install this [extension](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) for now.