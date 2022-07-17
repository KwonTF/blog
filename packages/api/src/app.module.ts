import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {RestModules} from './nest/rest'
import {GQLModules} from './nest/apollo'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ktf1008:qw12qw@maincluster.bbu7t.mongodb.net/?retryWrites=true&w=majority', {dbName: 'sample_training'}),
    GQLModules,
    RestModules
  ]
})
export class AppModule {}
