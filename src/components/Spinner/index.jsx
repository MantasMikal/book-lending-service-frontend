import React from 'react'
import styles from './Spinner.module.scss'
import { Spin } from 'antd'

const Spinner = () => {
  return (
    <div className={styles.Spinner}>
       <Spin size='large' />
    </div>
  )
}

export default Spinner
