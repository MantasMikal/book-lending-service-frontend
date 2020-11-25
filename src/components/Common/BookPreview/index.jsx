import React from "react";
import PropTypes from "prop-types";
import { imageUrlBuilderMany } from "../../../utilities/image-builder";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Badge from "../../Primitive/Badge";
import Thumbnail from "./components/Thumbnail";

import styles from "./BookPreview.module.scss";

const { Meta } = Card;
/**
 * Renders a book preview card
 */
const BookPreview = ({
  images,
  title,
  yearPublished,
  ID,
  status,
  onDelete,
  onUpdate,
}) => {
  // Actions with the book if available
  const ownerActions = onUpdate && onDelete && [
    <EditOutlined key="edit" onClick={onUpdate} />,
    <DeleteOutlined key="delete" onClick={onDelete} />,
  ];
  const image = imageUrlBuilderMany(images)[0];

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

BookPreview.propTypes = {
  images: PropTypes.string,
  title: PropTypes.string.isRequired,
  yearPublished: PropTypes.string.isRequired,
  ID: PropTypes.number.isRequired,
  status: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func
};

export default BookPreview;
