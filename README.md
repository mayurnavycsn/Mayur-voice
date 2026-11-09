# My Voice website

Type text, hear it in your cloned voice (SonexLabs).

## Setup

1. In SonexLabs, copy your **API key** and your cloned voice's **Voice ID**.
2. Put this folder on GitHub and import it in Vercel.
3. In Vercel > Project > Settings > Environment Variables, add:
   - `SONEX_API_KEY`
   - `SONEX_VOICE_ID`
4. Deploy and open the vercel.app link in Chrome (not the downloaded file).

## Files

- `index.html` - the page
- `api/speak.js` - backend that calls SonexLabs (keeps your key private)

## Notes

- Max 1000 characters per request.
- Anyone who finds your site URL can use your credits. Add a password or login before sharing it widely.
