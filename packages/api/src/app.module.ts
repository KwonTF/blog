import {Module} from '@nestjs/common'

import {RestModules} from './nest/rest'
import {GQLModules} from './nest/apollo'

@Module({
  imports: [GQLModules, RestModules]
})
export class AppModule {}
