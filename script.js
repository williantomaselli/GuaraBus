// script.js
const express    = require('express');
const mysql      = require('mysql2');
const path       = require('path');
const session    = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt     = require('bcrypt');

const app  = express();
const PORT = 3000;

// ----------------------------------------------
// 1) POOL DE CONEXÃO COM MYSQL
// ----------------------------------------------
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',     // Altere para sua senha real
  database: 'guarabus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ----------------------------------------------
// 2) CONFIGURAÇÃO DE SESSÃO (com MySQLStore)
// ----------------------------------------------
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutos
  expiration: 86400000,            // 1 dia
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, db.promise());

app.use(session({
  key: 'guarabus_sessao',
  secret: 'uma_chave_secreta_!@#$', // Em produção, troque por algo longo e aleatório
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
}));

// ----------------------------------------------
// 3) MIDDLEWARES DE PARSING
// ----------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------------------------------
// 4) SERVIR ARQUIVOS ESTÁTICOS
// ----------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------------
// 5) MIDDLEWARE PARA ROTAS PROTEGIDAS
// ----------------------------------------------
function verificarAutenticado(req, res, next) {
  if (req.session && req.session.motoristaId) {
    next();
  } else {
    return res.redirect('/login.html');
  }
}

// ----------------------------------------------
// 6) ROTA RAIZ (REDIRECIONA AO LOGIN OU MOTORISTA)
// ----------------------------------------------
app.get('/', (req, res) => {
  if (req.session && req.session.motoristaId) {
    return res.redirect('/motorista.html');
  }
  return res.redirect('/login.html');
});

// ----------------------------------------------
// 7) ROTA DE CADASTRO DE MOTORISTA
// ----------------------------------------------
app.post('/api/register-motorista', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, senha, confirmarSenha } = req.body;

    // 7.1) Validação básica
    if (!nome || !cpf || !email || !telefone || !senha || !confirmarSenha) {
      return res.status(400).send('Todos os campos são obrigatórios.');
    }
    if (senha !== confirmarSenha) {
      return res.status(400).send('As senhas não conferem.');
    }

    // 7.2) Verificar se já existe e-mail ou CPF
    const [jaExiste] = await db.promise().query(
      'SELECT id FROM motoristas WHERE email = ? OR cpf = ? LIMIT 1',
      [email, cpf]
    );
    if (jaExiste.length > 0) {
      return res.status(409).send('E-mail ou CPF já cadastrado.');
    }

    // 7.3) Criptografar senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 7.4) Inserir no banco
    await db.promise().query(
      'INSERT INTO motoristas (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?)',
      [nome, cpf, telefone, email, senhaHash]
    );

    // 7.5) Redirecionar para login
    return res.redirect('/login.html');
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).send('Erro interno ao cadastrar motorista.');
  }
});

// ----------------------------------------------
// 8) ROTA DE LOGIN DE MOTORISTA
// ----------------------------------------------
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send('E-mail e senha são obrigatórios.');
    }

    // 8.1) Buscar motorista
    const [rows] = await db.promise().query(
      'SELECT id, senha FROM motoristas WHERE email = ? LIMIT 1',
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).send('Credenciais inválidas.');
    }
    const motorista = rows[0];

    // 8.2) Comparar senhas
    const senhaValida = await bcrypt.compare(senha, motorista.senha);
    if (!senhaValida) {
      return res.status(401).send('Credenciais inválidas.');
    }

    // 8.3) Armazenar ID na sessão
    req.session.motoristaId = motorista.id;

    // 8.4) Redirecionar para motorista
    return res.redirect('/motorista.html');
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).send('Erro interno ao fazer login.');
  }
});

// ----------------------------------------------
// 9) ROTA PROTEGIDA PARA MOTORISTA
// ----------------------------------------------
app.get('/motorista.html', verificarAutenticado, (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'motorista.html'));
});

// ----------------------------------------------
// 10) ROTA DE LOGOUT (OPCIONAL)
// ----------------------------------------------
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.status(500).send('Erro ao fazer logout.');
    }
    res.clearCookie('guarabus_sessao');
    return res.redirect('/login.html');
  });
});

// ----------------------------------------------
// 11) ROTA DE CONFIRMAR PRESENÇA (PASSAGEIRO)
// ----------------------------------------------
app.post('/api/confirmar-presenca', async (req, res) => {
  try {
    const { rota_id, ponto_id } = req.body;
    if (!rota_id || !ponto_id) {
      return res.status(400).json({ error: 'rota_id e ponto_id são obrigatórios.' });
    }

    // Insere ou incrementa em confirmacoes
    const sql = `
      INSERT INTO confirmacoes (rota_id, ponto_id, passageiros)
      VALUES (?, ?, 1)
      ON DUPLICATE KEY UPDATE passageiros = passageiros + 1
    `;
    await db.promise().query(sql, [rota_id, ponto_id]);

    return res.json({ success: true });
  } catch (err) {
    console.error('Erro ao confirmar presença:', err);
    return res.status(500).json({ error: 'Erro interno ao confirmar presença.' });
  }
});

// ----------------------------------------------
// 12) INICIA O SERVIDOR
// ----------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
