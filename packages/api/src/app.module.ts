import {Module} from '@nestjs/common'

import {GQLModules} from './nest/modules'

@Module({
  imports: [GQLModules]
})
export class AppModule {}
