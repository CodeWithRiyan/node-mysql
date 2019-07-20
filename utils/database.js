const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'riyanisme',
    database: 'learn-node-mysql',
    password: 'riyan1128'
});

module.exports = pool.promise();