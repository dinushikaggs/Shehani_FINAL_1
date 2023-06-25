const {createConnection} = require('mysql');

const db = createConnection(
    {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.SQL_DB

    }
);

module.exports=db;