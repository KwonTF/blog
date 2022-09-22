import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {getDecryptedData} from '@blog/shared-utils/encrypt'

import {RestModules} from './nest/rest'
import {GQLModules} from './nest/apollo'

const mongoDBConnectUrl = getDecryptedData(process.env.MONGO_DB_KEY)
@Module({
  imports: [MongooseModule.forRoot(mongoDBConnectUrl, {dbName: 'blog'}), GQLModules, RestModules]
})
export class AppModule {}
