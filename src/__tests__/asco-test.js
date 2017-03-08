/* global describe, beforeEach, afterEach, it, xit */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  reducer,
  createCollection,
  destroyCollection,
  add
} from '../asco'


describe('Collection', () => {
  let store = {}

  beforeEach(() => {
    store = createStore(
      combineReducers({ asco: reducer }),
      applyMiddleware(thunk)
    )
  })

  it('should create new collection', () => {
    store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
    store.dispatch(createCollection('testCollection2', 'http://markviss.dev', 'api/v2/test'))
    store.dispatch(createCollection('testCollection3', 'http://www.test.com', 'api/v6/test'))

    const asco = store.getState().asco

    expect(asco.defaultHost).toEqual('http://markviss.dev')
    expect(asco.defaultPath).toEqual('api/v1/test')
    expect(Object.keys(asco.collections).length).toBe(3)

    expect(asco.collections.testCollection1).toEqual({
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://markviss.dev', path: 'api/v1/test' })
    expect(asco.collections.testCollection2).toEqual({
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://markviss.dev', path: 'api/v2/test' })
    expect(asco.collections.testCollection3).toEqual({
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://www.test.com', path: 'api/v6/test' })
  })

  it('should create new collection with default values', () => {
    store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))

    const newState = store.getState().asco
    expect(newState.collections).toEqual({
      testCollection1: {
        collection: [],
        order: [],
        filter: [],
        start: 0,
        length: 10,
        host: 'http://markviss.dev',
        path: 'api/v1/test'
      }
    })
  })

  it('should destroy collection', () => {
    store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
    store.dispatch(createCollection('testCollection2', 'http://markviss.dev', 'api/v2/test'))
    store.dispatch(createCollection('testCollection3', 'http://www.test.com', 'api/v6/test'))

    expect(Object.keys(store.getState().asco.collections).length).toBe(3)
    store.dispatch(destroyCollection('testCollection2'))
    expect(Object.keys(store.getState().asco.collections).length).toBe(2)
  })

  it('should add to collections', () => {
    const item = { name: 'Test name', number: 12345 }
    store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
    store.dispatch(add('testCollection1', item))
    expect(store.getState().asco.collections.testCollection1.collection).toEqual([item])
  })
})
