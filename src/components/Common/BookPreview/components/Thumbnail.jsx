import React from "react";
import PropTypes from "prop-types";

import styles from './Thumbnail.module.scss'

/**
 * Responsive thumbnail for the book
 */
const Thumbnail = ({href, image}) => (
  <a className={styles.ThumbnailWrapper} href={href}>
    <div
      className={styles.Thumbnail}
      style={{ backgroundImage: `url(${image})` }}
    />
  </a>
);

Thumbnail.propTypes = {
  href: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Thumbnail