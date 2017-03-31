/* global describe, beforeEach, afterEach, it, xit */

import { empty, getCollectionValue } from '../utils'
import { addCollection } from '../state-mutations'

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

  it('should return state value for a collection', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    const collection = {
      name: 'testCollection',
      collection: [],
      order: [],
      filter: [],
      start: 7,
      limit: 10,
      count: 125,
      host: 'http://localhost.dev:8080',
      path: '/api/v1'
    }

    const newState = addCollection(state, collection)

    expect(getCollectionValue(newState, 'testCollection', 'count')).toEqual(125)
  })

})
