import {INestApplication} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

import {AppModule} from './app.module'

type AsyncFunction = () => Promise<any>
type CreateNestServerArgs = {
  port: number
  bootingJobs?: AsyncFunction[]
  shutdownJobs?: AsyncFunction[]
}

const SHUTDOWN_TRIGGERS = ['SIGINT', 'SIGUSR2', 'SIGHUP', 'uncaughtException', 'unhandledRejection']
export async function createNestServer({port, bootingJobs, shutdownJobs}: CreateNestServerArgs): Promise<{app: INestApplication; start: () => void}> {
  if (!port) {
    throw new Error('Port Is Unavailable')
  }

  if (bootingJobs) {
    await Promise.all(bootingJobs.map((job) => job()))
  }

  const app = await NestFactory.create(AppModule)
  const shutdownPromise = Promise.all(shutdownJobs?.map((job) => job()) || [])

  for (const TRIGGER of SHUTDOWN_TRIGGERS) {
    process.on(TRIGGER, async () => {
      await shutdownPromise
    })
  }

  return {
    app,
    start: () => {
      // eslint-disable-next-line no-console
      console.log(`Server listen at http://localhost:${port}`)
      app.listen(port)
    }
  }
}
