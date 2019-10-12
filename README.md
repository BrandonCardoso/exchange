# exchange

### Setup
1. Install [Node.js](https://nodejs.org/en/) 
2. Clone the repo
```
git clone git@github.com:BrandonCardoso/exchange.git
```
3. Install node modules
```
cd exchange
npm install
```
4. Install [MariaDB](https://mariadb.org/)
5. Setup the `config.json` file in `exchange/config` to connect to your local SQL instance. (look at `config-example.json`)
6. Create the `exchange_dev` database with the username & password you set in `config.json`
7. Run the SequelizeJS migrations and seeders to create the tables and insert test data.
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
8. Run the site locally
```
npm start
```

Site should load from http://locahost:3000
