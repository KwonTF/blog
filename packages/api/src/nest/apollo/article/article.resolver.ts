import {Resolver, Query, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {convertToTypesObjectId} from '@blog/shared/utils/mongo'

import {ArticleModel, ArticlesDocument} from '@blog/api/src/schema/articles.schema'
import {MutationPostArticleArgs} from '@blog/api/src/graphql/generated/graphql-types'

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
  async postArticle(@Args() {input}: MutationPostArticleArgs) {
    const {author, title, body} = input || {}
    const resultArticle = await this.articleModel.create({
      author: convertToTypesObjectId(author),
      title,
      body,
      viewCount: 0
    })

    return resultArticle
  }
}

@Resolver('Article')
class ArticleResolver {
  @ResolveField('author')
  author(@Parent() parent: ArticleModel) {
    return parent.author
  }

  @ResolveField('viewCount')
  viewCount(@Parent() parent: ArticleModel) {
    return parent?.viewCount || 0
  }
}

export const resolvers = [ArticlesQueryResolver, ArticleMutationResolver, ArticleResolver]
