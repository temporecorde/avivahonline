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

    // Server-side validation and sanitization
    const sanitizedNome = String(nome).trim();
    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedWhatsapp = String(whatsapp).replace(/\D/g, ''); // Extract only digits

    if (sanitizedNome.length < 2 || sanitizedNome.length > 100 || /<script|<\/script>/i.test(sanitizedNome)) {
      return res.status(400).json({ success: false, message: 'Nome inválido.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 150) {
      return res.status(400).json({ success: false, message: 'E-mail inválido.' });
    }

    if (sanitizedWhatsapp.length < 10 || sanitizedWhatsapp.length > 15) {
      return res.status(400).json({ success: false, message: 'WhatsApp inválido.' });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://storage-unless-sublease.ngrok-free.dev/webhook/fddc1d86-e573-467d-a1ec-8fbe39d0a9b4";
    if (!webhookUrl) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno de configuração do servidor'
      });
    }

    // Add AbortController for timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ 
          nome: sanitizedNome, 
          whatsapp: sanitizedWhatsapp, 
          email: sanitizedEmail 
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Do not log full sensitive response text in production for data privacy
        console.error('Erro no webhook: Status', response.status);
        return res.status(500).json({
          success: false,
          message: 'Erro ao processar as informações'
        });
      }

      return res.status(200).json({ success: true });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('Falha de rede ao contatar o webhook', fetchErr.name === 'AbortError' ? 'Timeout' : '');
      return res.status(500).json({
        success: false,
        message: 'Falha temporária no processamento'
      });
    }
  } catch (error) {
    console.error('Erro interno em /api/cadastro');
    return res.status(500).json({
      success: false,
      message: 'Erro interno no servidor'
    });
  }
}
