import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../Navigation'

import styles from './Header.module.scss'

const Header = props => {
  return (
    <div className={styles.Header}>
      <Navigation />
    </div>
  )
}

Header.propTypes = {

}

export default Header
