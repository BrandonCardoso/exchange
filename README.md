# exchange
---

## Setup
* Install [Node.js](https://nodejs.org/en/) 
* Clone the repo with `git clone git@github.com:BrandonCardoso/exchange.git`
* `cd` into the repo directory and run `npm install`

* Install [MariaDB](https://mariadb.org/)
* Setup the `config.json` file in `exchange/config` to connect to your local SQL instance. (look at `config-example.json`)
* Create the `exchange_dev` database
* Run the SequelizeJS migrations to create the tables `npx sequelize-cli db:migrate`
* Run the SequelizeJS seeders to insert test/sample data `npx sequelize-cli db:seed:all`

* Run the site locally with `npm start`
* Site should load from http://127.0.0.1:3000
