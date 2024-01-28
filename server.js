const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost:3306',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Maia123!',
      database: 'company_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );