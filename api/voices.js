export default async function handler(req, res) {
  const apiKey = process.env.SONEX_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Set SONEX_API_KEY in Vercel first.' });
  }
  try {
    const r = await fetch('https://api.sonexlabs.com/v1/voices', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    const body = await r.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(r.status).send(body);
  } catch (err) {
    return res.status(500).json({ error: 'Could not reach SonexLabs.' });
  }
}
