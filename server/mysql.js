var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database : 'canvas',
    connectionLimit : 100,
});

pool.query(`select * from user where username='stu1'`, (err, res, field) => {
    if (err) console.log(err);
    else console.log(res);
})