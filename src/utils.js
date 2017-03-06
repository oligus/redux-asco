
/**
 * Catch-all empty check, will return true on empty variable.
 * Note that zero valued integer 0 and zero valued string '0' is considered empty
 *
 * @param mixedVariable
 * @returns {boolean}
 */
export const empty = (mixedVariable) => {
  const emptyValues = [undefined, null, false, 0, '', '0']

  for (let i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVariable === emptyValues[i]) {
      return true
    }
  }

  if (typeof mixedVariable === 'object') {
    let isEmpty = true

    Object.keys(mixedVariable).forEach((key) => {
      isEmpty = !Object.prototype.hasOwnProperty.call(mixedVariable, key)
    })

    return isEmpty
  }

  return false
}

/**
 * Fetches a value in a deep js data structure
 *
 * @param {object} obj      The object to search
 * @param {string} path     The path to find
 * @param {*} defaultValue  Default value if we can't find what we're looking for
 * @param {number} count    The current recursion count
 * @returns {*} The found value or undefined
 */
export const deepFetch = (obj, path, defaultValue = undefined, count = 0) => {
  const levels = path.split('.')

  // The path doesn't exist in the object
  if (levels.length === 0 || obj === undefined) {
    return defaultValue
  }

  if (count > 10) {
    console.warn('deepFetch error. Infinite loop detected!')
    return defaultValue
  }

  // We found the value we were looking for
  if (levels.length === 1) {
    return obj[levels[0]]
  }

  // We have to go deeper
  const firstElement = levels.shift()
  return deepFetch(obj[firstElement], levels.join('.'), defaultValue, count + 1)
}
