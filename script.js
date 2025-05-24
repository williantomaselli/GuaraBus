const express = require('express');
const mysql   = require('mysql2');
const path    = require('path');

const app = express();

// serve pasta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// configura conexão MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'guarabus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// rota front-end
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'motorista.html'));
});

// rota API: traz o próximo ponto + estimativa + confirmados
app.get('/api/info-ponto', (req, res) => {
  // aqui você pode usar lógica de “próximo ponto” real.
  // Para demo, pega a primeira rota com seu ponto:
  const sql = `
    SELECT 
      r.id   AS rota_id,
      p.id   AS ponto_id,
      p.nome AS ponto_nome,
      COALESCE(c.passageiros,0) AS confirmados
    FROM rotas r
    JOIN pontos p ON p.id = r.ponto_id
    LEFT JOIN (
      SELECT ponto_id, SUM(passageiros) AS passageiros
      FROM confirmacoes
      GROUP BY ponto_id
    ) c ON c.ponto_id = p.id
    ORDER BY r.horario_saida
    LIMIT 1;
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows[0]) return res.status(404).json({ error: 'Nenhum ponto encontrado' });

    const linha = rows[0];
    // estimativa aleatória de 1 a 10
    const estimativa = Math.floor(Math.random()*10) + 1;

    res.json({
      rota_id:     linha.rota_id,
      ponto_id:    linha.ponto_id,
      ponto_nome:  linha.ponto_nome,
      estimativa,
      confirmados: linha.confirmados
    });
  });
});

// rota API: confirma parada (incrementa)
app.post('/api/confirmar-ponto', (req, res) => {
  const { rota_id, ponto_id } = req.body;
  const sql = `
    INSERT INTO confirmacoes (rota_id, ponto_id, passageiros)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE passageiros = passageiros + 1;
  `;
  db.query(sql, [rota_id, ponto_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(3000, () =>
  console.log('Servidor rodando em http://localhost:3000')
);
