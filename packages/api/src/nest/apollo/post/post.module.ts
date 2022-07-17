import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {Grades, GradesSchema} from '../../../schema'
import {resolvers} from './post.resolver'

@Module({
  imports: [MongooseModule.forFeature([{name: Grades.name, schema: GradesSchema}])],
  providers: [...resolvers]
})
export class PostModule {}
