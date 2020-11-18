import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card } from "antd";
import {imageUrlBuilderMany} from "../../utilities/image-builder";

import styles from "./BookPreview.module.scss";

const { Meta } = Card;

const BookPreview = ({
  images,
  title,
  yearPublished,
  ID,
  withOwnerActions,
  onDelete,
  onUpdate,
}) => {
  const image = imageUrlBuilderMany(images)[0]
  console.log("image", image)
  console.log("images", images)
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
