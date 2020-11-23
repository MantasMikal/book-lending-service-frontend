import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card } from "antd";
import { imageUrlBuilderMany } from "../../../utilities/image-builder";

import Badge from "../../Primitive/Badge";
import Thumbnail from "./components/Thumbnail";

import styles from "./BookPreview.module.scss";

const { Meta } = Card;

const BookPreview = ({
  images,
  title,
  yearPublished,
  ID,
  status,
  withOwnerActions,
  onDelete,
  onUpdate,
}) => {
  const image = imageUrlBuilderMany(images)[0];
  const ownerActions = withOwnerActions && [
    <EditOutlined key="edit" onClick={onUpdate} />,
    <DeleteOutlined key="delete" onClick={onDelete} />,
  ];

  return (
    <div className={styles.BookPreview}>
      <Card
        hoverable
        cover={<Thumbnail href={`/book/${ID}`} image={image} />}
        actions={ownerActions}
      >
        <a href={`/book/${ID}`} className={styles.MetaWrapper}>
          <Meta
            className={styles.Meta}
            title={title}
            description={yearPublished}
          />
          <Badge status={status} />
        </a>
      </Card>
    </div>
  );
};

BookPreview.propTypes = {};

export default BookPreview;
