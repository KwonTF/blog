import {Resolver, Query, ResolveField, Parent} from '@nestjs/graphql'

@Resolver('Query')
class PostsQueryResolver {
  @Query('posts')
  getPosts() {
    return [1, 2]
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
