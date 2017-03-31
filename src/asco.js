import { handleActions } from 'redux-actions'
import 'whatwg-fetch'
import { empty } from './utils'
import Immutable from 'immutable'
import objectPathImmutable from 'object-path-immutable'
import {
  addCollection,
  hasCollection,
  getHost,
  getPath
} from './state-mutations'
import { getCollectionValue } from './utils'

import {
  CREATE_COLLECTION,
  DESTROY_COLLECTION,
  SET_LIMIT,
  ADD_ITEM,
  NEXT,
  FETCH,
  FETCH_PENDING
} from './constants'

const collectionDefaults = {
  name: 'defaultName',
  collection: [],
  order: [], // { column: 'test', order: 'asc'}, ..
  filter: [], // { column: 'test', typ}
  start: 0,
  limit: 10,
  count: 0,
  host: '',
  path: '',
  pending: false
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

export const setLimit = (collectionName, limit) => {
  return {
    type: SET_LIMIT,
    payload: { collectionName, limit }
  }
}

export const add = (collectionName, item) => {
  return {
    type: ADD_ITEM,
    payload: { collectionName, item }
  }
}

export const load = (collectionName) => (dispatch, getState) => {
  dispatch({ type: FETCH_PENDING, payload: { collectionName, pending: true } })

  const state = getState().asco
  const path = getPath(state, collectionName)
  const host = getHost(state, collectionName)
  const url = `${host}/${path}`

  const body = {
    start: getCollectionValue(state, collectionName, 'start'),
    limit: getCollectionValue(state, collectionName, 'limit')
  }

  return fetch(url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: JSON.stringify(body)
    })

    .then((response) => {
      if (!response.ok) {
        dispatch({ type: FETCH_PENDING, payload: { collectionName, pending: false } })
      }
      return response.json()
    })
    .then((response) => {
      dispatch({ type: FETCH, payload: {
        name: collectionName,
        collection: response.data.collection,
        count: empty(response.data.count) ? response.data.collection.length : response.data.count,
        pending: false
      } })
    })
}

export const next = (collectionName) => {
  return {
    type: NEXT,
    payload: { collectionName }
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
    if (!hasCollection(state, payload.collectionName)) {
      return state
    }

    return objectPathImmutable.push(state, `collections.${payload.collectionName}.collection`, payload.item)
  },

  [SET_LIMIT]: (state, { payload }) => {
    if (!hasCollection(state, payload.collectionName)) {
      return state
    }

    return objectPathImmutable.set(state, `collections.${payload.collectionName}.limit`, payload.limit)
  },

  [FETCH_PENDING]: (state, { payload }) => {
    if (!hasCollection(state, payload.collectionName)) {
      return state
    }

    return objectPathImmutable.set(state, `collections.${payload.collectionName}.pending`, payload.pending)
  },

  [FETCH]: (state, { payload }) => {
    if (!hasCollection(state, payload.name)) {
      return state
    }

    const defaultMap = Immutable.fromJS(state).get('collections').get(payload.name)
    const collection = defaultMap.mergeDeep(payload)
    const collections =  Immutable.fromJS(state).get('collections').set(payload.name, collection)
    return Immutable.fromJS(state).set('collections', collections).toJS()
  }


}, {
  collections: {},
  defaultHost: '',
  defaultPath: ''
})
