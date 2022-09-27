import React, {FC, useMemo, useState, useCallback} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import PhotoUpload from './PhotoUpload'
import styles from '../NewPage.scss'

interface Props {
  htmlString: string
}

const PhotoUploadPage: FC<Props> = ({htmlString}) => {
  useStyles(styles)
  const customAreas = useMemo(() => {
    const splitedHtmlItems = htmlString
      .split(new RegExp('(<p>!@#.+#@!</p>)'))
      .map((value) => {
        if (value.startsWith('<p>!@#')) {
          const [, comment] = value.split('#')
          const commentTest = new RegExp('.+')
          if (commentTest.test(comment)) {
            return comment
          }
        }
        return null
      })
      .filter(Boolean)

    return splitedHtmlItems || []
  }, [htmlString])

  const [images, setImages] = useState<FileList[]>(new Array(customAreas.length))
  const setMedia = useCallback((input: FileList, index: number) => {
    setImages((items) => {
      const tempItems = items
      tempItems[index] = input
      return tempItems
    })
  }, [])

  return (
    <>
      {customAreas.map((comment, index) => (
        <PhotoUpload key={`${index}_${comment}`} index={index} comment={comment} setMedia={setMedia} />
      ))}
    </>
  )
}

export default PhotoUploadPage
