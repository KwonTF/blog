import {Get} from '@nestjs/common'
import {Controller} from '@nestjs/common'

@Controller('image')
export class ImageController {
  @Get()
  getImage() {
    return ['image1', 'image2']
  }
}
