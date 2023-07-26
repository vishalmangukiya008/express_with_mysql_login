const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom'
})

function connect_db() {
    connection.connect()
   
}

module.exports = connection;