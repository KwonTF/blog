import {INestApplication} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

import {AppModule} from './app.module'

export async function createNestServer(port: number): Promise<{app: INestApplication; start: () => void}> {
  const app = await NestFactory.create(AppModule)
  return {
    app,
    start: () => {
      console.log(`Server listen at http://localhost:${port}`)
      app.listen(port)
    }
  }
}
