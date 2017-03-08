import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import objectPath from 'object-path'
import objectPathImmutable from 'object-path-immutable'
import { addCollection } from './state-mutations'

import {
  CREATE_COLLECTION,
  DESTROY_COLLECTION,
  ADD_ITEM
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
  dispatch({ type: CREATE_COLLECTION, payload })
}

export const destroyCollection = (name) => {
  return {
    type: DESTROY_COLLECTION,
    payload: { collectionName: name }
  }
}

export const add = (collectionName, item) => {
  return {
    type: ADD_ITEM,
    payload: { collectionName, item }
  }
}

export const reducer = handleActions({
  [CREATE_COLLECTION]: (state, { payload }) => {
    const defaultMap = Immutable.fromJS(collectionDefaults)
    const collection = defaultMap.mergeDeep(payload)
    return addCollection(state, collection.toJS())
  },

  [DESTROY_COLLECTION]: (state, { payload }) => {
    const collections = Immutable.fromJS(state).get('collections').delete(payload.collectionName)
    return Immutable.fromJS(state).set('collections', collections).toJS()
  },

  [ADD_ITEM]: (state, { payload }) => {
    if (!objectPath.has(state, `collections.${payload.collectionName}.collection`)) {
      return state
    }

    return objectPathImmutable.push(state, `collections.${payload.collectionName}.collection`, payload.item)
  },



}, {
  collections: {},
  defaultHost: '',
  defaultPath: ''
})
