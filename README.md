# Weather Dashboard
This is a weather dashboard app which visualizes data from the following API:
```
GET https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10
```
The API retrieves the following weather data from 01-Oct-2023 to 10-Oct-2023:
- hourly relative humidity
- hourly direct radiation
- daily minimum and maximum temperature

These data will be visualized into charts that can be filtered using the date range picker.

## Running the Dashboard 
### Prequisite
```
Node.js         v18
Angular.js      v17
MariaDB or Docker
```
### Setup Database
First navigate to `./backend` directory and install packages.
```
cd ./backend
npm ci
```
Then, create a `.env` file using `.env.example` and change the MariaDB config to the one you will be using. Leave the variable `MARIADB_DATABASE` unchange. 

Next, initialize the Database by running the following command, replacing the credentials
```
mariadb -uuser -ppassword < ./docker/db/init.sql
```
If you do not have MariaDB installed, you can choose to spin up an instance with docker by running the following in the `./backend` directory:
```
docker run --name mariadb -e MARIADB_ROOT_PASSWORD=root_password -e MARIADB_DATABASE=weatherData -e MARIADB_USER=user -e MARIADB_PASSWORD=password -v ./docker/db:/docker-entrypoint-initdb.d  -d -p 3306:3306  mariadb:11.1
```
Once the mariadb instance is running, run the following command to setup the database:
```
docker exec -it mariadb bash
mariadb -uuser -ppassword < /docker-entrypoint-initdb.d/init.sql
```
After setting up the database, run the following command in the `./backend` directory to populate it:
```
npm run etl
```
When the database is populated, the dashboard is ready to be launch. First, start the backend server with:
```
npm start
```
Next, navigate to the `./dashboard` directory and install packages and start the dashboard.
```
cd ../dashboard
npm ci
ng serve
```
You should now be able to access the dashboard at `http://localhost:4200/`.

Alternatively, you can run this with `docker compose`.
```
docker compose build
docker compose up
```
Once the dashboard container is done building, the dashboard can be accessed on `http://localhost:4200/`.
