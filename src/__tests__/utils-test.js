/* global describe, beforeEach, afterEach, it, xit */

import { empty, deepFetch } from '../utils'

describe('Utils', () => {

  it('should return true if empty', () => {
    expect(empty()).toBeTruthy()
    expect(empty(null)).toBeTruthy()
    expect(empty(undefined)).toBeTruthy()
    expect(empty(false)).toBeTruthy()
    expect(empty(0)).toBeTruthy()
    expect(empty('')).toBeTruthy()
    expect(empty('0')).toBeTruthy()
    expect(empty(' df ')).toBeFalsy()
    expect(empty([])).toBeTruthy()
    expect(empty([0])).toBeFalsy()
    expect(empty([2])).toBeFalsy()
    expect(empty({})).toBeTruthy()
    expect(empty({ key: 'value' })).toBeFalsy()
  })

  const magicValue = 'value'

  it('deepFetch finds value one level deep', () => {
    const obj = {
      level1: magicValue
    }

    const value = deepFetch(obj, 'level1')
    expect(value).toEqual(magicValue)
  })

  it('deepFetch finds value three levels deep', () => {
    const obj = {
      level1: {
        level2: {
          level3: magicValue
        }
      }
    }

    const value = deepFetch(obj, 'level1.level2.level3')
    expect(value).toEqual(magicValue)
  })

  it('deepFetch returns undefined when path is wrong', () => {
    const obj = {
      level1: {
        level2: {
          level3: magicValue
        }
      }
    }

    const value = deepFetch(obj, 'level1.wrongPath.level3')
    expect(value).toBeUndefined()
  })

})
