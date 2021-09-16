
const express = require('express');
const fs = require('fs');
const app = express();
const public_ip = '82.223.68.210';
const port = 3000;

/*
const net = require('net');
const client = net.connect({ port: 80, host: "google.com" }, () => {
  console.log('MyIP=' + client.localAddress);
  console.log('MyPORT=' + client.localPort);
});
*/

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: fs.readFileSync('./adminPass.txt', {encoding:'utf8'} ),
  database: 'blog'
});

connection.connect();

app.get('/', (req, res) => {
  res.send('Nice try');
});

app.get('/articles', (req, res) => {
  connection.query('SELECT * FROM article', function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(port, public_ip, () => {
  console.log(`Example app listening at http://${public_ip}:${port}`);
});