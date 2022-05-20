import React, {FC, useMemo} from 'react'
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

  return (
    <>
      {customAreas.map((comment, index) => (
        <PhotoUpload comment={comment} key={`${index}_${comment}`} />
      ))}
    </>
  )
}

export default PhotoUploadPage
