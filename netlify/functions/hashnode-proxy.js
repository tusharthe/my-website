const HASHNODE_API = 'https://gql.hashnode.com'

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
        const response = await fetch(HASHNODE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: event.body,
        })

        const text = await response.text()

        // Guard against non-JSON (e.g. redirect landing pages)
        let data
        try {
            data = JSON.parse(text)
        } catch {
            console.error('Hashnode returned non-JSON:', text.slice(0, 300))
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({ errors: [{ message: `Hashnode API returned unexpected response (status ${response.status}). Endpoint may have changed.` }] }),
            }
        }

        return { statusCode: 200, headers, body: JSON.stringify(data) }
    } catch (err) {
        console.error('hashnode-proxy error:', err)
        return { statusCode: 500, headers, body: JSON.stringify({ errors: [{ message: err.message }] }) }
    }
}
