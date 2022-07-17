import {Get} from '@nestjs/common'
import {Controller} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {Grades, GradesDocument} from '@blog/api/src/schema'

@Controller('image')
export class ImageController {
  constructor(@InjectModel(Grades.name) private gradeModel: Model<GradesDocument>) {}

  @Get()
  async getImage() {
    const result = await this.gradeModel.findOne()
    return result?.scores.map(({type}) => type)
  }
}
