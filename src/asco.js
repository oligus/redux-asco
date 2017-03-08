import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { addCollection } from './state-mutations'

import {
  ASCO_CREATE_COLLECTION,
  ASCO_DESTROY_COLLECTION
} from './constants'

const collectionDefaults = {
  name: 'defaultName',
  collection: [],
  order: [], // { column: 'test', order: 'asc'}, ..
  filter: [], // { column: 'test', typ}
  start: 0,
  length: 10,
  host: '',
  path: ''
}

export const createCollection = (name, host, path) => (dispatch) => {
  const payload = { name, host, path }
  dispatch({ type: ASCO_CREATE_COLLECTION, payload })
}

export const destroyCollection = (name) => {
  return {
    type: ASCO_DESTROY_COLLECTION,
    payload: { collectionName: name }
  }
}

export const reducer = handleActions({
  [ASCO_CREATE_COLLECTION]: (state, { payload }) => {
    const defaultMap = Immutable.fromJS(collectionDefaults)
    const collection = defaultMap.mergeDeep(payload)
    return addCollection(state, collection.toJS())
  },

  [ASCO_DESTROY_COLLECTION]: (state, { payload }) => {
    const collections = Immutable.fromJS(state).get('collections').delete(payload.collectionName)
    return Immutable.fromJS(state).set('collections', collections).toJS()
  }
}, {
  collections: {},
  defaultHost: '',
  defaultPath: ''
})
