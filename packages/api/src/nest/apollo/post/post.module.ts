import {Module} from '@nestjs/common'

import {SchemaModule} from '@blog/api/src/schema'

import {resolvers} from './post.resolver'

@Module({
  imports: [SchemaModule],
  providers: [...resolvers]
})
export class PostModule {}
