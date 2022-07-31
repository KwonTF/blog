import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {getDecryptedData} from '@blog/shared-utils/encrypt'
import {ServerConfig} from '@blog/shared/config'

import {RestModules} from './nest/rest'
import {GQLModules} from './nest/apollo'

const mongoDBConnectUrl = getDecryptedData(ServerConfig.encrypted.mongoUrl)
@Module({
  imports: [MongooseModule.forRoot(mongoDBConnectUrl, {dbName: 'sample_training'}), GQLModules, RestModules]
})
export class AppModule {}
