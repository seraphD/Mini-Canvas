var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "wingofyou123",
    database : 'canvas',
    connectionLimit : 100,
});

module.exports = pool;