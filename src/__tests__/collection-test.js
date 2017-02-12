/* global describe, it, xit */
import { createAction } from 'redux-actions'

import {
  reducer
} from '../collection'


import {
  ASCO_CREATE_COLLECTION,
  ASCO_DESTROY_COLLECTION
} from '../constants'

const createCollection = createAction(ASCO_CREATE_COLLECTION)
const destroyCollection = createAction(ASCO_DESTROY_COLLECTION)

const state = {

};

describe('Collection', () => {
  it('should create new collection with default values', () => {
    const updatedState = reducer(state, createCollection('myCollection'))
    expect(updatedState).toEqual({
      myCollection: {
        collection: [],
        order: [],
        filter: [],
        start: 0,
        length: 10
      }
    })
  })

  it('should create new collection with default values', () => {
    reducer(state, createCollection('myCollection'))
    const updatedState = reducer(state, destroyCollection('myCollection'))

    console.log(updatedState)
  })

})
