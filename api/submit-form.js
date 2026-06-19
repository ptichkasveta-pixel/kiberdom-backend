export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { parentName, childAge, contact } = req.body;

  const message = `
🆕 Новая заявка с лендинга Кибердом

👩 Родитель: ${parentName}
👦 Возраст ребёнка: ${childAge}
📱 Контакт: ${contact}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
