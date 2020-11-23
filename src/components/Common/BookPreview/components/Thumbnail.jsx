import React from "react";
import styles from './Thumbnail.module.scss'

const Thumbnail = ({href, image}) => (
  <a className={styles.ThumbnailWrapper} href={href}>
    <div
      className={styles.Thumbnail}
      style={{ backgroundImage: `url(${image})` }}
    />
  </a>
);


export default Thumbnail