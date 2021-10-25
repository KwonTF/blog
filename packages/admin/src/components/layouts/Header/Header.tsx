import React, {FC, useState} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from './Header.scss'

const Header: FC = () => {
  useStyles(styles)
  const [userName] = useState<string>('UserName')
  return (
    <div className={styles.base}>
      <span>welcome, {userName}!</span>
    </div>
  )
}

export default Header
