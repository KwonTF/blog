import {createNestServer} from './createNestServer'

async function startServer() {
  const server = await createNestServer(765)
  server.start()
}

startServer()
