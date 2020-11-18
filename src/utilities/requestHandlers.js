/**
 * Check the HTTP status code and resolve or reject accordingly
 * @param {object} response - the Response() object to process
 */
export const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Promise((resolve, reject) => {
        return reject(response);
      });
    }
}

/**
 * Extract the response body for further processing
 * @param {object} response - the Response() object to process
 */
export const json = (response) => {
  return response.json();
}