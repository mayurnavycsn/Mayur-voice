const API_BASE = 'https://api.sonexlabs.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST.' });
  }
  const apiKey = process.env.SONEX_API_KEY;
  const voiceId = process.env.SONEX_VOICE_ID;
  if (!apiKey || !voiceId) {
    return res.status(500).json({ error: 'Server is missing API key or voice ID.' });
  }
  const text = req.body && req.body.text;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  if (text.length > 1000) {
    return res.status(400).json({ error: 'Text is too long (max 1000 characters).' });
  }
  try {
    const r = await fetch(`${API_BASE}/v1/speech/stream`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, voice_id: voiceId, speed: 1.0 })
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('SonexLabs error', r.status, detail);
      return res.status(502).json({ error: 'Voice service error (' + r.status + ').' });
    }
    const audio = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(audio);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
}
