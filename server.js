const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maia123!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  db.query('SELECT * FROM company_db.department;', function (err, results) {
    console.log(results);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });