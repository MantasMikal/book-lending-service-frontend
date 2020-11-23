import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'antd';

const statusMap = {
  'Available': 'success',
  'Requested': 'warning',
  'On Loan': 'error'
}

const StatusBadge = ({status}) => {
  return (
    <Badge text={status} status={statusMap[status]} />
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
}

export default StatusBadge
