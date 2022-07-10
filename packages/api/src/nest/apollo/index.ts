import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'

import {schemaPath} from '@blog/api/src/graphql/merge'

import {PostModule} from './post/post.module'

@Module({
  imports: [
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [schemaPath],
      playground: true
    })
  ]
})
export class GQLModules {}
