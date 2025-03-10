import { Hono } from 'hono'
import { html } from 'hono/html'
import { serveEmojiFavicon } from 'stoker/middlewares';

const app = new Hono()

// API endpoint that returns just the IP
app.get('/ip4', (c) => {
  const ip = 
    c.req.header('cf-connecting-ip') || 
    c.req.header('x-forwarded-for')?.split(',')[0] || 
    c.req.header('x-real-ip') ||
    'unknown';
  
  return c.text(ip)
})

// Main page with a simple UI
app.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script defer src="https://analytics.bramsuurd.nl/script.js" data-website-id="835132ac-b6a5-4e25-986b-6f879540dd1e"></script>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔎</text></svg>">
        <title>What's My IP?</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background: #18181b;
            color: white;
            text-align: center;
          }
          .made-by {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
          }
          .support-button {
            color: #fff;
            text-decoration: underline;
          }
          .ip-display {
            font-size: 2rem;
            margin: 2rem 0;
            padding: 1rem;
            background-color: #3f3f46;
            border-radius: 8px;
            word-break: break-all;
          }
          button {
            padding: 0.5rem 1rem;
            background: #f4f4f4;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>What's My IP?</h1>
        <div class="ip-display" id="ip">Loading...</div>
        <button onclick="copyIP()">Copy to Clipboard</button>
        <div class="made-by">made with love by <a class="bram-button" target="_blank" href="https://bramsuurd.nl">Bram Suurd</a></div>
        
        <script>
          // Fetch the IP on page load
          fetch('/ip4')
          .then(res => res.text())
          .then(ip => {
            document.getElementById('ip').textContent = ip;
          })
          .catch(err => {
            document.getElementById('ip').textContent = 'Error getting IP';
          });
          // Copy to clipboard function
          function copyIP() {
            const ip = document.getElementById('ip').textContent;
            navigator.clipboard.writeText(ip)
          }
        </script>
      </body>
    </html>
  `)
})

export default app
