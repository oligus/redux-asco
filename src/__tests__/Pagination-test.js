/* global describe, beforeEach, afterEach, it, xit */

import Pagination from '../Pagination'
import { getStart, getCount, getLimit} from '../Pagination'

import { addCollection } from '../state-mutations'

describe('Utils', () => {

  it('should return true if empty', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    const collection = {
      name: 'myCollection',
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

    expect(getStart(newState, 'myCollection')).toEqual(7)
    expect(getCount(newState, 'myCollection')).toEqual(125)
    expect(getLimit(newState,'myCollection')).toEqual(10)
  })

})
