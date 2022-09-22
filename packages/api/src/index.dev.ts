import path from 'path'

import {closeCodegenWatcher, generateGraphql} from '@blog/shared-utils/graphql-codegen'

import {createNestServer} from './createNestServer'

async function startServer() {
  const server = await createNestServer({
    port: 765,
    bootingJobs: [() => generateGraphql(path.join(__dirname, '../codegen.yml'))],
    shutdownJobs: [async () => closeCodegenWatcher()]
  })
  server.start()
}

startServer()
