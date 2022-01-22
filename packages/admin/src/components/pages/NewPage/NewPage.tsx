import React, {FC, useState} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import {PageEditor} from './PageEditor'
import {PagePreview} from './PagePreview'
import styles from './NewPage.scss'

const NewPage: FC = () => {
  useStyles(styles)

  const [htmlString, setHtmlString] = useState<string>('')

  return (
    <div>
      <PageEditor setHtmlString={setHtmlString} />
      <PagePreview htmlString={htmlString} />
    </div>
  )
}

export default NewPage
