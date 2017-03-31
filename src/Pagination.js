import Immutable from 'immutable'
import { hasCollection } from './state-mutations'
import { getCollectionValue } from './utils'

export default class Pagination
{

}

export const getStart = (state, collectionName) => {
  return getCollectionValue(state, collectionName, 'start')
}

export const getLimit = (state, collectionName) => {
  return getCollectionValue(state, collectionName, 'limit')
}

export const getCount = (state, collectionName) => {
  return getCollectionValue(state, collectionName, 'count')
}