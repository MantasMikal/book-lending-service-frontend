import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./BookImages.module.scss";

const BookImages = ({ images }) => {
  const [currentImageId, setCurrentImageId] = useState(0);
  const currentImage = images[currentImageId];

  return (
    <div className={styles.BookImages}>
      <div
        className={styles.Thumbnail}
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <div className={styles.Images}>
        {images &&
          images.length > 1 &&
          images.map((img, i) => (
            <button className={styles.SmallThumbnail}>
              <div
                onClick={() => setCurrentImageId(i)}
                className={styles.SmallImage}
                style={{ backgroundImage: `url(${img})` }}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

BookImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default BookImages;
