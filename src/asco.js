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
  SET_START,
  ADD_ITEM,
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

const fetchCollection = (collectionName, url, body, dispatch) => {
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
      dispatch({
        type: FETCH, payload: {
          name: collectionName,
          collection: response.data.collection,
          count: empty(response.data.count) ? response.data.collection.length : response.data.count,
          pending: false
        }
      })
    })
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

  return fetchCollection(collectionName, url, body, dispatch)
}

export const next = (collectionName) => (dispatch, getState) => {
  dispatch({ type: FETCH_PENDING, payload: { collectionName, pending: true } })

  const state = getState().asco
  const path = getPath(state, collectionName)
  const host = getHost(state, collectionName)
  const url = `${host}/${path}`

  let start = getCollectionValue(state, collectionName, 'start')
  const limit = getCollectionValue(state, collectionName, 'limit')
  const count = getCollectionValue(state, collectionName, 'count')

  if (start + limit < count) {
    start = start + limit
  }

  dispatch({ type: SET_START, payload: { collectionName, start } })

  const body = { start, limit }

  return fetchCollection(collectionName, url, body, dispatch)
}

export const previous = (collectionName) => (dispatch, getState) => {
  dispatch({ type: FETCH_PENDING, payload: { collectionName, pending: true } })

  const state = getState().asco
  const path = getPath(state, collectionName)
  const host = getHost(state, collectionName)
  const url = `${host}/${path}`

  let start = getCollectionValue(state, collectionName, 'start')
  const limit = getCollectionValue(state, collectionName, 'limit')

  if (start - limit > 0) {
    start = start - limit
  } else {
    start = 0
  }

  dispatch({ type: SET_START, payload: { collectionName, start } })

  const body = { start, limit }

  return fetchCollection(collectionName, url, body, dispatch)
}

/**
 * Reducer
 */
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


  [SET_START]: (state, { payload }) => {
    if (!hasCollection(state, payload.collectionName)) {
      return state
    }

    return objectPathImmutable.set(state, `collections.${payload.collectionName}.start`, payload.start)
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
