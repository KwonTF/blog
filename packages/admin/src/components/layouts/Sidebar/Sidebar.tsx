import React, {FC} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from './Sidebar.scss'

const Sidebar: FC = () => {
  useStyles(styles)

  return (
    <div className={styles.sidebar}>
      <button
        onClick={() => {
          console.log('POST')
        }}
      >
        Post Article
      </button>
      <button
        onClick={() => {
          console.log('EDIT')
        }}
      >
        Edit Article
      </button>
    </div>
  )
}

export default Sidebar
