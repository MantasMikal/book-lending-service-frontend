import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'antd';

const statusMap = {
  'Available': 'success',
  'Requested': 'warning',
  'On Loan': 'error',
  'Open': 'warning',
  'Accepted': 'processing',
  'Completed': 'success'
}

/**
 * Wrapper that maps all request/book states to a color
 */
const StatusBadge = ({status}) => {
  return (
    <Badge text={status} status={statusMap[status]} />
  )
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.keys(statusMap))
}

export default StatusBadge
