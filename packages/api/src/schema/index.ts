import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {PostModel, PostsSchema} from './posts.schema'

const MongooseSchemas = MongooseModule.forFeature([{name: PostModel.name, schema: PostsSchema}])

@Module({
  imports: [MongooseSchemas],
  exports: [MongooseSchemas]
})
export class SchemaModule {}
