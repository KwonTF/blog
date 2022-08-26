import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Date, Document, SchemaTypes, Types} from 'mongoose'

export type PostsDocument = PostModel & Document

@Schema({collection: 'posts'})
export class PostModel {
  @Prop(SchemaTypes.ObjectId)
  author: Types.ObjectId

  @Prop(String)
  thumbnail?: string

  @Prop(String)
  title: string

  @Prop(String)
  body: string

  @Prop(SchemaTypes.ObjectId)
  backPost?: Types.ObjectId

  @Prop(SchemaTypes.ObjectId)
  nextPost?: Types.ObjectId

  @Prop(SchemaTypes.ObjectId)
  group?: Types.ObjectId

  @Prop(SchemaTypes.Date)
  createdDate: Date

  @Prop(SchemaTypes.Date)
  editedDate?: Date

  @Prop(Number)
  viewCount: number

  @Prop([String])
  tags?: string[]

  @Prop(Number)
  difficulty?: number

  @Prop({type: [{desc: {type: String}, cards: {type: {url: {type: String}, desc: {type: String}, color: {type: String}, textColor: {type: String}}}}]})
  flickItems?: {desc: string; cards: {url: string; desc: string; color: string; textColor: string}[]}[]

  @Prop({type: [{url: {type: String}, desc: {type: String}, color: {type: String}, textColor: {type: String}}]})
  cards?: {url: string; desc: string; color: string; textColor: string}[]
}

export const PostsSchema = SchemaFactory.createForClass(PostModel)
