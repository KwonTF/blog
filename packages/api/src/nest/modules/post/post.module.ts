import {Module} from '@nestjs/common'

import {resolvers} from './post.resolver'

@Module({
  providers: [...resolvers]
})
export class PostModule {}
