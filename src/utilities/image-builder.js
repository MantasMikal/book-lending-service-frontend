import config from '../config'
import imagePlaceholder from '../assets/images/image_placeholder.jpg'

/**
 * Utility to build image urls
 * With fallback image
 * @param {String} imageName image name on the server
 */
const imageUrlBuilder = (imageName) => {
  if(!imageName) return imagePlaceholder
  const {API_HOST} = config
  return `${API_HOST}/uploads/${imageName}`
}

export default imageUrlBuilder