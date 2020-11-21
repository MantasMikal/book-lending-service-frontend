/**
 * Executes a function after a certain amount of time
 * since it was last invoked
 * @param {Function} func function to be executed
 * @param {Number} wait wait time
 */
const debounce = (func, wait = 10) => { 
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

export default debounce