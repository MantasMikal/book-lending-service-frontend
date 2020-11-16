import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Badge.module.scss'

const statusMap = {
  'Available': 'green',
  'Requested': 'yellow',
  'On Loan': 'red'
}

const Badge = ({status}) => {
  return (
    <div className={cn(styles.Badge, styles[statusMap[status]])}>
      {status}
    </div>
  )
}

Badge.propTypes = {

}

export default Badge
