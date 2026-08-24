exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  // Salve `data` em um banco de dados (Supabase, MongoDB, etc)
  // Para testes, use uma variável global (mas não persiste entre deploys)
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
