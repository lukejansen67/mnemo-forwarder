export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/22890415/2n0djfi/';

  try {
    const forwardResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!forwardResponse.ok) {
      const errorText = await forwardResponse.text();
      console.error('Zapier error:', errorText);
      return res.status(500).json({ message: 'Failed to forward to Zapier' });
    }

    return res.status(200).json({ message: 'Forwarded to Zapier successfully' });
  } catch (error) {
    console.error('Forwarding error:', error);
    return res.status(500).json({ message: 'Unexpected error' });
  }
}
