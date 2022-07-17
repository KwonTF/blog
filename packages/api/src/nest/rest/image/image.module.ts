import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {Grades, GradesSchema} from '@blog/api/src/schema'

import {ImageController} from './image.controller'

@Module({
  imports: [MongooseModule.forFeature([{name: Grades.name, schema: GradesSchema}])],
  controllers: [ImageController]
})
export class ImageModule {}
