import React from 'react'
import PropTypes from 'prop-types'
import bookPlaceholder from '../../assets/images/book_placeholder.jpg'

import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import styles from './BookPreview.module.scss'

const { Meta } = Card;

const BookPreview = ({imageURL, title, yearPublished, ID}) => {
  const image = imageURL || bookPlaceholder
  return (
    <a href={`/book/${ID}`} className={styles.BookPreview}>
      <Card cover={<img alt={title} src={image} />}>
        <Meta
          title={title}
          description={yearPublished}
           />
      </Card>
    </a>
  )
}

BookPreview.propTypes = {

}

export default BookPreview
