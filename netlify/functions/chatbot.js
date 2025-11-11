// Netlify Function to proxy requests to n8n webhook
// This avoids CORS issues by making the request server-side

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Parse the incoming request body
        const { message, timestamp } = JSON.parse(event.body);

        // Make the request to n8n webhook using GET with query parameters
        const url = new URL('https://karamq6.app.n8n.cloud/webhook/ras-chatbot');
        url.searchParams.append('message', message);
        url.searchParams.append('timestamp', timestamp);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Get the response from n8n
        const data = await response.json();

        // Return the response to the client
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error calling n8n webhook:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to process message',
                message: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact us through our social media links!'
            })
        };
    }
};
