const mysql = require('mysql2');
const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'guarabus', 
    port: 3306
});

// Conecta ao banco
connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log("Conexão com o banco de dados estabelecida com sucesso");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para a home (index.html)
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});
