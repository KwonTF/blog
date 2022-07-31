import {Get, Post, UseInterceptors, Controller, UploadedFiles} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {FilesInterceptor} from '@nestjs/platform-express'

import {Grades, GradesDocument} from '@blog/api/src/schema'

@Controller('image')
export class ImageController {
  constructor(@InjectModel(Grades.name) private gradeModel: Model<GradesDocument>) {}

  @Get()
  async getImage() {
    const result = await this.gradeModel.findOne()
    return result?.scores.map(({type}) => type)
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async postImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    // eslint-disable-next-line no-console
    console.log(files)
  }
}
