//* imports dependancies
const mysql = require('mysql2');

//* creats connection to sql database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maia123!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`),
);

//* displays error if any
db.connect(function(err) {
    if (err) {
        console.log(err);
    }
});

//* exports connection
module.exports = db;
