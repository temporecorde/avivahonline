export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { nome, whatsapp, email } = req.body || {};

    if (!nome || !whatsapp || !email) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios ausentes'
      });
    }

    const webhookUrl = "https://storage-unless-sublease.ngrok-free.dev/webhook/dfbc64e8-4424-4d14-ae0f-8f600b990beb";
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL não configurada');
      return res.status(500).json({
        success: false,
        message: 'Erro interno de configuração do servidor'
      });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({ nome, whatsapp, email })
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Erro no webhook:', response.status, text);
      return res.status(500).json({
        success: false,
        message: 'Erro ao enviar cadastro'
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro interno em /api/cadastro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno no servidor'
    });
  }
}
