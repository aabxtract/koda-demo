import http from 'node:http'
import { handleRequest } from './src/api.js'

const PORT = process.env.PORT || 3456
const server = http.createServer(handleRequest)
server.listen(PORT, () => console.log(`Fixture app on http://localhost:${PORT}`))
