
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
