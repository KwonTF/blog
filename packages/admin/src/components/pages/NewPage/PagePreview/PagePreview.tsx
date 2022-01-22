import React, {FC} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'

interface Props {
  htmlString: string
}

const PagePreview: FC<Props> = ({htmlString}) => {
  useStyles(styles)

  return <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
}

export default PagePreview
