import {Resolver, Query, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {ArticleModel, ArticlesDocument} from '@blog/api/src/schema/articles.schema'

@Resolver('Query')
class ArticlesQueryResolver {
  constructor(@InjectModel(ArticleModel.name) private articleModel: Model<ArticlesDocument>) {}

  @Query('articles')
  async getArticles() {
    const result = await this.articleModel.find({viewCount: 0})
    return result
  }
}

@Resolver('Mutation')
class ArticleMutationResolver {
  constructor(@InjectModel(ArticleModel.name) private articleModel: Model<ArticlesDocument>) {}
  @Mutation('postArticle')
  async postArticle(@Args() args) {
    return null
  }
}

@Resolver('Article')
class ArticleResolver {
  @ResolveField('author')
  author(@Parent() parent: ArticleModel) {
    return parent.author
  }
}

export const resolvers = [ArticlesQueryResolver, ArticleMutationResolver, ArticleResolver]
