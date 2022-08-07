import {Get, Post, UseInterceptors, Controller, UploadedFiles} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import fetch from 'node-fetch'
import {FilesInterceptor} from '@nestjs/platform-express'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {fromIni} from '@aws-sdk/credential-providers'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

import {getDecryptedData} from '@blog/shared-utils/encrypt'

import {Grades, GradesDocument} from '@blog/api/src/schema'

const BUCKET_NAME = getDecryptedData(process.env.S3_BUCKET_NAME)
const S3_REGION = getDecryptedData(process.env.S3_REGION)

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
    const s3Client = new S3Client({
      region: S3_REGION,
      credentials: fromIni({filepath: '../../../.aws/credentials', configFilepath: '../../../.aws/config'})
    })

    try {
      for (const file of files) {
        const bucketParams = {
          Bucket: BUCKET_NAME,
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer
        }
        const command = new PutObjectCommand(bucketParams)
        const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600})

        await fetch(signedUrl, {method: 'PUT', body: bucketParams.Body})
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
}
