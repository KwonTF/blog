import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {Grades, GradesSchema} from './grades.schema'

export * from './grades.schema'

const MongooseSchemas = MongooseModule.forFeature([{name: Grades.name, schema: GradesSchema}])

@Module({
  imports: [MongooseSchemas],
  exports: [MongooseSchemas]
})
export class SchemaModule {}
