import {Resolver, Query, ResolveField, Parent} from '@nestjs/graphql'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {Grades, GradesDocument} from '@blog/api/src/schema'

@Resolver('Query')
class PostsQueryResolver {
  constructor(@InjectModel(Grades.name) private gradeModel: Model<GradesDocument>) {}

  @Query('posts')
  async getPosts() {
    const result = await this.gradeModel.findOne({class_id: 339})
    return [result.class_id]
  }
}

@Resolver('Post')
class PostResolver {
  @ResolveField('author')
  author(@Parent() parent) {
    return parent
  }
}

export const resolvers = [PostsQueryResolver, PostResolver]
