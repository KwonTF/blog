import mongoose from 'mongoose'

export type MongoId = string | mongoose.Types.ObjectId

export function convertToTypesObjectId(id: MongoId) {
  if (typeof id === 'string') {
    return new mongoose.Types.ObjectId(id)
  }

  return id
}
