const mysql = require('mysql2');
const express = require('express'); 
const bodyParser = require('body-parser'); 

const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'guarabus', 
    port: 3306
});

connection.connect(function (err) {
    if (err) {
        console.error('Erro ', err);
        return
    }
    console.log("Conexão ok")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});




app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});