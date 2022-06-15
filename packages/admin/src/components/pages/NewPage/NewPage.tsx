import React, {FC, useState} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import {PageEditor} from './PageEditor'
import {PagePreview} from './PagePreview'
import styles from './NewPage.scss'
import PhotoUploadPage from './PhotoUploadPage'

const NewPage: FC = () => {
  useStyles(styles)

  const [htmlString, setHtmlString] = useState<string>('')
  const [isUploadPage, toUploadPage] = useState<boolean>(false)

  return (
    <div>
      {!isUploadPage && <PageEditor setHtmlString={setHtmlString} toUploadPage={toUploadPage} />}
      {isUploadPage && <PhotoUploadPage htmlString={htmlString} />}
      <PagePreview htmlString={htmlString} />
    </div>
  )
}

export default NewPage
