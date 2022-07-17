import {Module} from '@nestjs/common'

import {SchemaModule} from '@blog/api/src/schema'

import {ImageController} from './image.controller'

@Module({
  imports: [SchemaModule],
  controllers: [ImageController]
})
export class ImageModule {}
