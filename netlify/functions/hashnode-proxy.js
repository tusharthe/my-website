// Try endpoints in order until one returns valid JSON
const ENDPOINTS = [
    'https://gql.hashnode.com',
    'https://api.hashnode.com',
]

async function tryFetch(url, body, token) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body,
        redirect: 'manual',
    })
    const text = await res.text()
    try {
        return { ok: true, data: JSON.parse(text), url }
    } catch {
        return { ok: false, status: res.status, preview: text.slice(0, 100), url }
    }
}

export const handler = async (event) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' }
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
    }

    const token = process.env.HASHNODE_TOKEN
    if (!token) {
        return { statusCode: 500, headers, body: JSON.stringify({ errors: [{ message: 'HASHNODE_TOKEN not configured on server.' }] }) }
    }

    try {
        const failures = []

        for (const url of ENDPOINTS) {
            const result = await tryFetch(url, event.body, token)
            if (result.ok) {
                return { statusCode: 200, headers, body: JSON.stringify(result.data) }
            }
            console.error(`[hashnode-proxy] ${url} failed — status ${result.status}: ${result.preview}`)
            failures.push(`${url} → ${result.status}`)
        }

        return {
            statusCode: 502,
            headers,
            body: JSON.stringify({ errors: [{ message: `All Hashnode endpoints failed: ${failures.join(' | ')}` }] }),
        }
    } catch (err) {
        console.error('[hashnode-proxy] fetch error:', err)
        return { statusCode: 500, headers, body: JSON.stringify({ errors: [{ message: err.message }] }) }
    }
}
