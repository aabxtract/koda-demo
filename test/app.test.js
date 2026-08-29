import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { handleRequest } from '../src/api.js'

function get(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handleRequest)
    server.listen(0, () => {
      const { port } = server.address()
      http.get(`http://localhost:${port}${path}`, res => {
        let body = ''
        res.on('data', d => body += d)
        res.on('end', () => { server.close(); resolve({ status: res.statusCode, body }) })
      }).on('error', reject)
    })
  })
}

describe('Fixture API', () => {
  it('GET /health returns 200 and status ok', async () => {
    const res = await get('/health')
    assert.equal(res.status, 200)
    const body = JSON.parse(res.body)
    assert.equal(body.status, 'ok')
  })
  it('GET / returns 200', async () => {
    const res = await get('/')
    assert.equal(res.status, 200)
  })
  it('GET /missing returns 404', async () => {
    const res = await get('/missing')
    assert.equal(res.status, 404)
  })
})
