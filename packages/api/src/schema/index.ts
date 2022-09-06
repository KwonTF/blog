import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {ArticleModel, ArticlesSchema} from './articles.schema'

const MongooseSchemas = MongooseModule.forFeature([{name: ArticleModel.name, schema: ArticlesSchema}])

@Module({
  imports: [MongooseSchemas],
  exports: [MongooseSchemas]
})
export class SchemaModule {}
