import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {Grades, GradesSchema} from './grades.schema'
import {Posts, PostsSchema} from './posts.schema'

export * from './grades.schema'

const MongooseSchemas = MongooseModule.forFeature([
  {name: Grades.name, schema: GradesSchema},
  {name: Posts.name, schema: PostsSchema}
])

@Module({
  imports: [MongooseSchemas],
  exports: [MongooseSchemas]
})
export class SchemaModule {}
