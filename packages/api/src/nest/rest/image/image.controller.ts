import {Get, Post, UseInterceptors, Controller, UploadedFiles} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {FilesInterceptor} from '@nestjs/platform-express'
import * as AWS from 'aws-sdk'

import {getDecryptedData} from '@blog/shared-utils/encrypt'
import {ServerConfig} from '@blog/shared/config'

import {Grades, GradesDocument} from '@blog/api/src/schema'

const ACC_KEY = getDecryptedData(ServerConfig.encrypted.s3.accessKey)
const SECURE_ACC_KEY = getDecryptedData(ServerConfig.encrypted.s3.secureAccessKey)
const BUCKET_NAME = getDecryptedData(ServerConfig.encrypted.s3.bucketName)
const S3_REGION = getDecryptedData(ServerConfig.encrypted.s3.region)

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
    AWS.config.update({
      credentials: {
        accessKeyId: ACC_KEY,
        secretAccessKey: SECURE_ACC_KEY
      }
    })

    try {
      const S3Service = new AWS.S3()
      for (const file of files) {
        const fileKey = `${Date.now() + file.originalname}`
        await S3Service.putObject({
          Key: fileKey,
          Body: file.buffer,
          Bucket: BUCKET_NAME
        }).promise()

        const signedUrl = `https://${BUCKET_NAME}.${S3_REGION}.amazonaws.com/${fileKey}`
        // eslint-disable-next-line no-console
        console.log(signedUrl)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
}
