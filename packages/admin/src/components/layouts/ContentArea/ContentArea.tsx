import React, {FC} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import Sidebar from '@blog/admin/src/components/layouts/Sidebar'
import PageArea from '@blog/admin/src/components/layouts/PageArea'

import styles from './ContentArea.scss'

const ContentArea: FC = () => {
  useStyles(styles)
  return (
    <div className={styles.base}>
      <Sidebar />
      <PageArea />
    </div>
  )
}

export default ContentArea
