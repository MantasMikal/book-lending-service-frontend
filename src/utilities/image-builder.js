import imagePlaceholder from "../assets/images/image_placeholder.jpg";

const API_HOST = process.env.REACT_APP_API_HOST

/**
 * Utility to build image urls
 * With fallback image
 * @param {String} imageName image name on the server
 * @returns {String} image url
 */
export const imageUrlBuilder = (imageName) => {
  if (!imageName) return imagePlaceholder;
  return `${API_HOST}/uploads/${imageName}`;
};

/**
 * Utility to build image urls from array of images
 * With fallback image
 * @param {String} images string of image names separated by ';'
 * @returns {Array} of image urls
 */
export const imageUrlBuilderMany = (images) => {
  if (!images || Array.isArray(images) || !images.length > 0)
    return [imagePlaceholder];
  return images.split(";").map((img) => imageUrlBuilder(img));
};
