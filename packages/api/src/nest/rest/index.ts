import {Module} from '@nestjs/common'

import {ImageModule} from './image/image.module'

@Module({
  imports: [ImageModule]
})
export class RestModules {}
