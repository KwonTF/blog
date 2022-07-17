import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {MongooseModule} from '@nestjs/mongoose'

import {schemaPath} from '@blog/api/src/graphql/merge'

import {PostModule} from './post/post.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ktf1008:qw12qw@maincluster.bbu7t.mongodb.net/?retryWrites=true&w=majority', {dbName: 'sample_training'}),
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [schemaPath],
      playground: true
    })
  ]
})
export class GQLModules {}
