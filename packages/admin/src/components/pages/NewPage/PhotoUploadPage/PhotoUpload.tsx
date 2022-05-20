import React, {FC, useCallback, ChangeEvent} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'

interface Props {
  comment: string
  setMedia?: () => void
}

const PhotoUpload: FC<Props> = ({comment}) => {
  useStyles(styles)

  const handleMediaChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
  }, [])

  return (
    <div>
      <span>{comment}</span>
      <input type='file' accept='image/*' capture={false} multiple={true} onChange={handleMediaChange} />
    </div>
  )
}

export default PhotoUpload
