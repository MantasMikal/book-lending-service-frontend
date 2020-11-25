import React from 'react'
import Navigation from '../Navigation'

import styles from './Header.module.scss'

/**
 * Page Header
 */
const Header = () => {
  return (
    <div className={styles.Header}>
      <Navigation />
    </div>
  )
}

export default Header
