const mysql = require('mysql2');
const { database } = require('./keys');
// require("dotenv").config();

let CONFIGDB = {
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
  dateStrings: true,
}

let conn = mysql.createConnection(CONFIGDB);

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
  }, 10000);
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

// function handleDisconnect() {
//   conn = mysql.createConnection(CONFIGDB); // Recreate the connection, since
//   // the old one cannot be reused.

//   conn.connect(function (err) {
//     // The server is either down
//     if (err) {
//       // or restarting (takes a while sometimes).
//       console.log('Error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     } // to avoid a hot loop, and to allow our node script to
//   }); // process asynchronous requests in the meantime.
//   // If you're also serving http, display a 503 error.
//   conn.on('error', function (err) {
//     console.log('Db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // Connection to the MySQL server is usually
//       handleDisconnect(); // lost due to either server restart, or a
//     } else {
//       // connnection idle timeout (the wait_timeout
//       throw err; // server variable configures this)
//     }
//   });
// }

// handleDisconnect();

module.exports = conn;
