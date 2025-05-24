-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS guarabus;
USE guarabus;

-- Tabela de motoristas
CREATE TABLE motoristas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- Tabela de ônibus
CREATE TABLE onibus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    modelo VARCHAR(50),
    capacidade INT,
    motorista_id INT,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id)
);

-- Tabela de pontos de embarque
CREATE TABLE pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL
);

-- Tabela de rotas
CREATE TABLE rotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    horario_saida TIME NOT NULL,
    ponto_id INT,
    onibus_id INT,
    FOREIGN KEY (ponto_id) REFERENCES pontos(id),
    FOREIGN KEY (onibus_id) REFERENCES onibus(id)
);

-- tabela para armazenar confirmações de parada
CREATE TABLE IF NOT EXISTS confirmacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rota_id INT      NOT NULL,
    ponto_id INT     NOT NULL,
    passageiros INT  NOT NULL DEFAULT 0,
    FOREIGN KEY (rota_id) REFERENCES rotas(id),
    FOREIGN KEY (ponto_id) REFERENCES pontos(id)
);

-- (opcional) insira um ponto, rota e 1 confirmação pra demo
INSERT INTO pontos (nome, endereco) VALUES ('Terminal Urbano','Rua X, 123');
INSERT INTO rotas (nome, horario_saida, ponto_id, onibus_id) VALUES ('Rota A','08:00:00',1,1);
INSERT INTO confirmacoes (rota_id, ponto_id, passageiros) VALUES (1,1,3);
