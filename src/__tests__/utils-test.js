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

})
