import http from 'node:http'

export function handleRequest(req, res) {
  if (req.url === '/health') {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ status: 'error' }))
  }
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    return res.end('<h1>Fixture App</h1><p>Home page</p>')
  }
  res.writeHead(404)
  res.end('Not found')
}
