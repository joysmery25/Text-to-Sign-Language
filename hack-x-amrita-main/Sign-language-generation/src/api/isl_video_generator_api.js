export async function generateSignVideo({ text, subject, difficulty, options = {} }) {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  const url = `${base.replace(/\/$/, '')}/generate`

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, subject, difficulty, options })
  })

  if (!resp.ok) {
    const body = await resp.text().catch(() => null)
    const msg = body || `Request failed with status ${resp.status}`
    const err = new Error(msg)
    err.status = resp.status
    throw err
  }

  const data = await resp.json().catch(async () => {
    // try to return text fallback
    const txt = await resp.text()
    return { explanation: txt }
  })

  // Expected response shape: { explanation, video_url, avatar }
  return data
}

export default { generateSignVideo }
