import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card } from "antd";
import imageUrlBuilder from "../../utilities/image-builder";

import styles from "./BookPreview.module.scss";

const { Meta } = Card;

const BookPreview = ({
  imageURL,
  title,
  yearPublished,
  ID,
  withOwnerActions,
  onDelete,
  onUpdate,
}) => {
  const image = imageUrlBuilder(imageURL)
  const ownerActions = withOwnerActions && [
    <EditOutlined key="edit" onClick={onUpdate} />,
    <DeleteOutlined key="delete" onClick={onDelete} />,
  ];
  return (
    <div className={styles.BookPreview}>
      <Card cover={<div className={styles.Thumbnail} style={{backgroundImage: `url(${image})`}} />} actions={ownerActions}>
        <a href={`/book/${ID}`}>
          <Meta title={title} description={yearPublished} />
        </a>
      </Card>
    </div>
  );
};

BookPreview.propTypes = {};

export default BookPreview;
