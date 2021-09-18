
const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');

const public_ip = '82.223.68.210';
const port = 3000;

app.use(cors( { origin: '*' } ));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: fs.readFileSync('./adminPass.txt', { encoding: 'utf8' }),
  database: 'blog'
});

connection.connect();

app.get('/', (req, res) => {
  console.log('[', new Date(), ']', '/');
  res.send('Nice try');
});

app.post('/api', (req, res) => {
  console.log('[', new Date(), ']', '/api', req.body);

  connection.query('SELECT * FROM article', function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.post('/api/manager', (req, res) => {
  console.log('[', new Date(), ']', '/api/manager', req.body);

  res.send({res: 'OK'});
});

app.listen(port, public_ip, () => {
  console.log(`App listening at http://${public_ip}:${port}`);
});