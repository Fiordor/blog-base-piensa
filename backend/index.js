
const express = require('express');
const fs = require('fs');
const app = express();
const public_ip = '82.223.68.210';
const port = 3000;

app.use( express.urlencoded({ extended: true }) );
app.use(express.json())

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: fs.readFileSync('./adminPass.txt', {encoding:'utf8'} ),
  database: 'blog'
});

connection.connect();

app.get('/', (req, res) => {
  console.log('path', '/');
  res.send('Nice try');
});

app.post('/articles', (req, res) => {
  console.log('path', '/articles');
  console.log('body');
  console.log(req.body);

  connection.query('SELECT * FROM article', function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(port, public_ip, () => {
  console.log(`Example app listening at http://${public_ip}:${port}`);
});