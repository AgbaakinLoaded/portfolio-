const { Pool } = require("pg");


const pool = new Pool({

    user: "postgres",

    host: "localhost",

    database: "portfolio_db",

    password: "Akinsola",

    port: 5432

});


module.exports = pool;