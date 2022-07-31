import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type GradesDocument = Grades & Document

@Schema()
export class Grades {
  @Prop(Number)
  student_id: number

  @Prop({type: Number})
  class_id: number

  @Prop({type: [{type: {type: String}, score: {type: Number}}]})
  scores: {type: string; score: number}[]
}

export const GradesSchema = SchemaFactory.createForClass(Grades)
