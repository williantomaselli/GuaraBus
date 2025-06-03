-- -----------------------------------------------------
-- 1) CRIAÇÃO DO BANCO E TABELAS
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS guarabus;
USE guarabus;

-- Tabela de motoristas (exemplo mínimo)
CREATE TABLE IF NOT EXISTS motoristas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  telefone VARCHAR(15),
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de pontos de embarque
CREATE TABLE IF NOT EXISTS pontos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(200) NOT NULL
);

-- Tabela de rotas (cada linha aponta para um ponto_id)
CREATE TABLE IF NOT EXISTS rotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ponto_id INT NOT NULL,
  horario_saida DATETIME NOT NULL,
  FOREIGN KEY (ponto_id) REFERENCES pontos(id)
);

-- Tabela de confirmações de parada
CREATE TABLE IF NOT EXISTS confirmacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rota_id INT NOT NULL,
  ponto_id INT NOT NULL,
  passageiros INT NOT NULL DEFAULT 0,
  FOREIGN KEY (rota_id) REFERENCES rotas(id),
  FOREIGN KEY (ponto_id) REFERENCES pontos(id)
);

-- -----------------------------------------------------
-- 2) INSERÇÃO DOS 18 PONTOS (com coordenadas em "endereco")
-- -----------------------------------------------------
TRUNCATE TABLE pontos;
INSERT INTO pontos (nome, endereco) VALUES
  ('Terminal Jaraguá',           '-26.4786, -49.0852'),
  ('Ponto Banco do Brasil',      '-26.4816344, -49.0822225'),
  ('Ponto Igreja',               '-26.4820914, -49.0772141'),
  ('Ponto Fort',                 '-26.4816167, -49.0750358'),
  ('Ponto Multimotors',          '-26.4797403, -49.0722594'),
  ('Ponto Big Dog Brasil',       '-26.4822096, -49.0710386'),
  ('Ponto Marisol',              '-26.4816873, -49.0661807'),
  ('Ponto BalMec',               '-26.4807246, -49.0617777'),
  ('Ponto Lotérica Baependi',    '-26.4800108, -49.0587468'),
  ('Ponto WEG Portaria 21',      '-26.4781640, -49.0516955'),
  ('Ponto WEG Portaria 23',      '-26.4776703, -49.0442734'),
  ('Ponto Viaduto',              '-26.4785038, -49.0368804'),
  ('Ponto Vonpar',               '-26.4742323, -49.0212759'),
  ('Ponto Costello',             '-26.4757656, -49.0168366'),
  ('Ponto Enfrente Benner',      '-26.4795673, -49.0078560'),
  ('Ponto Vilmar Demolições',    '-26.4755202, -48.9898190'),
  ('Ponto MMG Caminhões',        '-26.4744046, -48.9793600'),
  ('Ponto Transluc',             '-26.4775923, -49.0324017');

-- -----------------------------------------------------
-- 3) INSERÇÃO DE 18 LINHAS EM “rotas” (ponto_id = 1..18)
--    Aqui usamos o mesmo horário de saída para simplificar.
-- -----------------------------------------------------
TRUNCATE TABLE rotas;
INSERT INTO rotas (ponto_id, horario_saida) VALUES
  (1, '2025-06-10 08:00:00'),
  (2, '2025-06-10 08:00:00'),
  (3, '2025-06-10 08:00:00'),
  (4, '2025-06-10 08:00:00'),
  (5, '2025-06-10 08:00:00'),
  (6, '2025-06-10 08:00:00'),
  (7, '2025-06-10 08:00:00'),
  (8, '2025-06-10 08:00:00'),
  (9, '2025-06-10 08:00:00'),
  (10, '2025-06-10 08:00:00'),
  (11, '2025-06-10 08:00:00'),
  (12, '2025-06-10 08:00:00'),
  (13, '2025-06-10 08:00:00'),
  (14, '2025-06-10 08:00:00'),
  (15, '2025-06-10 08:00:00'),
  (16, '2025-06-10 08:00:00'),
  (17, '2025-06-10 08:00:00'),
  (18, '2025-06-10 08:00:00');
