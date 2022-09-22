import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'

import {schemaPath} from '@blog/api/src/graphql/merge'

import {ArticleModule} from './article/article.module'

@Module({
  imports: [
    ArticleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [schemaPath],
      playground: true
    })
  ]
})
export class GQLModules {}
