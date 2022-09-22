import {Module} from '@nestjs/common'

import {SchemaModule} from '@blog/api/src/schema'

import {resolvers} from './article.resolver'

@Module({
  imports: [SchemaModule],
  providers: [...resolvers]
})
export class ArticleModule {}
