
const express = require('express');
const app = express();
const port = 3000;

const net = require('net');
const client = net.connect({ port: 80, host: "google.com" }, () => {
  console.log('MyIP=' + client.localAddress);
  console.log('MyPORT=' + client.localPort);
});

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Pensando_En_Voz_Baja_v1#',
  database: 'blog'
});

connection.connect();

connection.query('SELECT * FROM article', function (err, rows, fields) {
  if (err) throw err;
  console.log('Primera consulta');
  console.log(rows);
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM article', function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
  //res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});