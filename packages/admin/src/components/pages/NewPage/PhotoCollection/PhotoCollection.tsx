import React, {FC} from 'react'

interface Props {
  collectionId: string
}

const PhotoCollection: FC<Props> = ({collectionId}) => (
  <div>
    <input defaultValue='customCompWOW' />
    <img src='https://picsum.photos/200/300' />
    <br />
    <p>Get Prop item ID {collectionId} WOW~</p>
  </div>
)
export default PhotoCollection
