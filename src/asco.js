import { createAction, handleActions } from 'redux-actions'
import imm from 'object-path-immutable'
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

export const createCollection = (name, host, path) => (dispatch, getState) => {
  const payload = { name, host, path }
  dispatch({ type: ASCO_CREATE_COLLECTION, payload })
}

export const reducer = handleActions({
  [ASCO_CREATE_COLLECTION]: (state, { payload }) => {
    const defaultMap = Immutable.fromJS(collectionDefaults)
    const collection = defaultMap.mergeDeep(payload)
    return addCollection(state, collection.toJS())
  },

  [ASCO_DESTROY_COLLECTION]: (state, { payload: collectionName }) => {
    return imm(state).set([collectionName], collectionDefaults).value()
  }
}, {
  collections: {},
  defaultHost: '',
  defaultPath: ''
  }
)
