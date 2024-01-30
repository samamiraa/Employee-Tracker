const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maia123!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`),
);

db.connect(function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = db;
