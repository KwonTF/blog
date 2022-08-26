import {Resolver, Query, ResolveField, Parent} from '@nestjs/graphql'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {PostModel, PostsDocument} from '@blog/api/src/schema/posts.schema'

@Resolver('Query')
class PostsQueryResolver {
  constructor(@InjectModel(PostModel.name) private postModel: Model<PostsDocument>) {}

  @Query('posts')
  async getPosts() {
    const result = await this.postModel.find({viewCount: 0})
    return result
  }
}

@Resolver('Post')
class PostResolver {
  @ResolveField('author')
  author(@Parent() parent: PostModel) {
    return parent.author.toString()
  }
}

export const resolvers = [PostsQueryResolver, PostResolver]
