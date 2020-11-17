import config from '../config'
import imagePlaceholder from '../assets/images/image_placeholder.jpg'

/**
 * Utility to build image urls
 * With fallback image
 * @param {String} imageName image name on the server
 */
const imageUrlBuilder = (imageName) => {
  if(!imageName) return imagePlaceholder
  const {API_URL} = config
  return `${API_URL}/uploads/${imageName}`
}

export default imageUrlBuilder