/**
 * Validates a file
 * @param {File} file 
 * @param {Array} allowedTypes array of allowed file types. e.g. 'image/jpeg'
 * @param {Number} maxSize maximum file size in bytes
 * @returns {Boolean}
 */
const validateFile = (file, allowedTypes, maxSize) => {
  if(!file || !Array.isArray(allowedTypes)) return false
  if(file.size > maxSize) return false
  return allowedTypes.includes(file.type)
}

export default validateFile