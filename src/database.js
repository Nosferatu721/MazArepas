const mysql = require('mysql2');
const { database } = require('./keys');
// require("dotenv").config();

const DATABASE_URL = 'mysql://9zzzfpheyhnq:pscale_pw_mBAGTdBv3myDka4n3l4JugO1nIDLE2uHi6klW_gd8w0@c9aonqzlijdb.us-east-4.psdb.cloud/db_mazarepas?ssl={"rejectUnauthorized":true}';

let conn = mysql.createConnection(DATABASE_URL);

// * Valida si se desconecta Node y DB
// conn.end();
try {
  console.log('Connected DB ༼ つ ◕_◕ ༽つ', database.host);
  const sqlPsicologos = 'SELECT 1';
  setInterval(() => {
    conn
      .promise()
      .query(sqlPsicologos)
      .then(([result, fields]) => {
        console.log('Todo Correcto');
      })
      .catch((err) => console.log('ERROR::', err));
  }, 3600000);
} catch (error) {
  if (error) {
    let posicion = error.message.indexOf("Can't add new command when connection is in closed state");
    if (posicion !== -1) {
      console.log('Disconnected DB :(');
      conn = mysql.createConnection({
        host: database.host,
        user: database.user,
        database: database.database,
        password: database.password,
        dateStrings: true,
      });
      console.log('Reconected DB ༼ つ ◕_◕ ༽つ');
    }
  }
}

module.exports = conn;
