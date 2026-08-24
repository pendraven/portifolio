const crypto = require('crypto');

exports.handler = async (event) => {
  const { password } = JSON.parse(event.body || '{}');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // Cria um token simples (em produção use JWT com expiração)
    const token = crypto.createHmac('sha256', process.env.JWT_SECRET)
      .update(new Date().toISOString())
      .digest('hex');

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  }

  return { statusCode: 401, body: JSON.stringify({ error: 'Senha incorreta' }) };
};