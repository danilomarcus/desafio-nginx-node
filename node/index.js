const express = require('express');
const app = express();

const port = 5000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

var people = '';
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
  connection.query(sqlTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });


  const sql = `INSERT INTO people(name) VALUES ('Danilo Full Cicle')`
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.query("SELECT id, name FROM people", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // people = result[1].name
    for(let i = 0; i < result.length; i++ ){
      people = people + '<li>' + result[i].id + ' - ' + result[i].name + '</li>';
    }
  });

});

app.get('/', (req, res) => {
  const html = `<h1>Full Cycle Rocks!</h1>\n
  <ul>
    ${people}
  </ul>
  <br>
  <br>
  <a href='#'>by Danilo Marcus</a>
  `
  res.send(html)
})

app.listen(port, () => console.log('Server is up and running'));