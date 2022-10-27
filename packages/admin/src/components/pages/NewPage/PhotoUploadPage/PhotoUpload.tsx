import React, {FC, useCallback, ChangeEvent, useRef} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'

interface Props {
  index: number
  comment: string
  setMedia: (input: FileList, index: number) => void
}

const PhotoUpload: FC<Props> = ({index, comment, setMedia}) => {
  useStyles(styles)

  const inputRef = useRef<HTMLInputElement>()
  const handleMediaChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {files} = e.target
      if (!inputRef?.current || !files) {
        return null
      }

      if (files.length > 4) {
        inputRef.current.value = ''
        alert('4개까지 사진 구성이 가능합니다.')
        return null
      }

      setMedia(files, index)
    },
    [index, setMedia]
  )

  return (
    <div>
      <span>{comment}</span>
      <input type='file' accept='image/*' capture={false} multiple={true} ref={inputRef} onChange={handleMediaChange} />
    </div>
  )
}

export default PhotoUpload
