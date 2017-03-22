import Immutable from 'immutable'
import { empty, deepFetch } from './utils'

const hasHost = (imState) => (
  !empty(imState.get('defaultHost'))
)

const hasPath = (imState) => (
  !empty(imState.get('defaultPath'))
)

/**
 * Set default host, asco will try this second after collection specific host
 *
 * @param state
 * @param host
 * @returns {*}
 */
export const setDefaultHost = (state, host) => {
  if (empty(host)) {
    return state
  }

  return Immutable.fromJS(state).mergeDeep({ defaultHost: host }).toJS()
}

/**
 * Set default path, , asco will try this second after collection specific path
 *
 * @param state
 * @param path
 * @returns {*}
 */
export const setDefaultPath = (state, path) => {
  if (empty(path)) {
    return state
  }
  return Immutable.fromJS(state).mergeDeep({ defaultPath: path }).toJS()
}

/**
 * Checks if collection exists in state
 *
 * @param state
 * @param collectionName
 * @returns {boolean}
 */
export const hasCollection = (state, collectionName) => {
  const collections = state.collections

  if (!empty(collections) && !empty(collectionName)) {
    return Object.prototype.hasOwnProperty.call(collections, collectionName)
  }

  return false
}

/**
 *
 * @param state
 * @param collectionName
 * @returns {string}
 */
export const getHost = (state, collectionName) => {
  let host = ''

  if (hasCollection(state, collectionName)) {
    host = Immutable.fromJS(state)
      .get('collections')
      .get(collectionName)
      .get('host')
  }

  if (empty(host)) {
    host = Immutable.fromJS(state).get('defaultHost')
  }

  return empty(host) ? '' : host
}

/**
 *
 * @param state
 * @param collectionName
 * @returns {string}
 */
export const getPath = (state, collectionName) => {
  let path = ''

  if (hasCollection(state, collectionName)) {
    path = Immutable.fromJS(state)
      .get('collections')
      .get(collectionName)
      .get('path')
  }

  if (empty(path)) {
    path = Immutable.fromJS(state).get('defaultPath')
  }

  return empty(path) ? '' : path
}

/**
 * Adds a collection to collection array *and* sets default host/api if not set
 *
 * @param state
 * @param collection
 * @returns {*}
 */
export const addCollection = (state, collection) => {
  if (hasCollection(state, collection.name)) {
    console.warn('Collection already exists')
  }

  const newCollection = collection
  const collectionName = newCollection.name
  delete newCollection.name

  const newState = Immutable.fromJS(state).mergeDeep({
    collections: Immutable.fromJS(state).get('collections').set(collectionName, newCollection)
  })

  if (hasHost(newState) && hasPath(newState)) {
    return newState.toJS()
  }

  const defaultHostState = setDefaultHost(newState.toJS(), collection.host)
  const defaultPathState = setDefaultPath(newState, collection.path)

  if (!hasHost(newState) && hasPath(newState)) {
    return newState.set('defaultHost', defaultHostState.defaultHost).toJS()
  }

  if (hasHost(newState) && !hasPath(newState)) {
    return newState.set('defaultPath', defaultPathState.defaultPath).toJS()
  }

  return newState
    .set('defaultHost', defaultHostState.defaultHost)
    .set('defaultPath', defaultPathState.defaultPath)
    .toJS()
}
