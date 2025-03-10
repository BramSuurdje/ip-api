import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { html } from 'hono/html'

const app = new Hono()

// API endpoint that returns just the IP
app.get('/ip4', (c) => {
  const ip = 
    c.req.header('cf-connecting-ip') || 
    c.req.header('x-forwarded-for')?.split(',')[0] || 
    c.req.header('x-real-ip') ||
    'unknown';
  
  return c.json({ ip })
})

// Main page with a simple UI
app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>What's My IP?</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }
          .ip-display {
            font-size: 2rem;
            margin: 2rem 0;
            padding: 1rem;
            background: #f5f5f5;
            border-radius: 8px;
            word-break: break-all;
          }
          button {
            padding: 0.5rem 1rem;
            background: #0070f3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>What's My IP?</h1>
        <div class="ip-display" id="ip">Loading...</div>
        <button onclick="copyIP()">Copy to Clipboard</button>
        
        <script>
          // Fetch the IP on page load
          fetch('/api/ip')
            .then(res => res.json())
            .then(data => {
              document.getElementById('ip').textContent = data.ip;
            })
            .catch(err => {
              document.getElementById('ip').textContent = 'Error getting IP';
            });
          
          // Copy to clipboard function
          function copyIP() {
            const ip = document.getElementById('ip').textContent;
            navigator.clipboard.writeText(ip)
              .then(() => alert('IP copied to clipboard!'))
              .catch(err => alert('Failed to copy IP'));
          }
        </script>
      </body>
    </html>
  `)
})

export default app
