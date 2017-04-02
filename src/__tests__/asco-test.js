/* global describe, beforeEach, afterEach, it, xit */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'whatwg-fetch'
import fetchMock from 'fetch-mock'

import {
  reducer,
  createCollection,
  destroyCollection,
  setLimit,
  add,
  load,
  previous,
  next
} from '../asco'

import {
  FETCH_PENDING,
  FETCH
} from '../constants'

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
      collection: [], order: [], filter: [], start: 0, limit: 10, count: 0,
      host: 'http://markviss.dev', path: 'api/v1/test', pending: false })
    expect(asco.collections.testCollection2).toEqual({
      collection: [], order: [], filter: [], start: 0, limit: 10, count: 0,
      host: 'http://markviss.dev', path: 'api/v2/test', pending: false })
    expect(asco.collections.testCollection3).toEqual({
      collection: [], order: [], filter: [], start: 0, limit: 10, count: 0,
      host: 'http://www.test.com', path: 'api/v6/test', pending: false })
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
        limit: 10,
        count: 0,
        host: 'http://markviss.dev',
        path: 'api/v1/test',
        pending: false
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

  it('should set limit', () => {
    store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
    store.dispatch(setLimit('testCollection1', 123))
    expect(store.getState().asco.collections.testCollection1.limit).toEqual(123)
  })

  describe('fetch data', () => {

    it('should dispatch pending action', () => {
      store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
      const getState = () => (store.getState())
      const dispatch = jasmine.createSpy('Dispatch spy')

      load('testCollection1')(dispatch, getState)
        .catch(error => {})
      expect(dispatch).toHaveBeenCalledWith({
        type: '@@redux-asco/FETCH_PENDING', payload: Object({ collectionName: 'testCollection1', pending: true })
      })
    })

    it('should set collection in pending mode', () => {
      store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
      const state = store.getState().asco
      expect(state.collections.testCollection1.pending).toBe(false)

      const result = reducer(state, {
        type: FETCH_PENDING,
        payload: {
          collectionName: 'testCollection1',
          pending: true
        }
      })

      expect(result.collections.testCollection1.pending).toBe(true)
    })

    it('should set collection in pending mode', () => {
      store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
      const getState = () => (store.getState())
      const dispatch = jasmine.createSpy('Dispatch spy')

      const result = {
        data: {
          collection: [
            { name: 'test1', age: 11 },
            { name: 'test2', age: 22 },
            { name: 'test3', age: 33 }
          ],
          start: 0,
          limit: 10,
          count: 3
        }
      }

      fetchMock.post('http://markviss.dev/api/v1/test', result)

      load('testCollection1')(dispatch, getState)
        .then(data => {
          //console.log('d', data)
        })

      fetchMock.restore()
    })

    it('should reduce fetched data', () => {
      store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
      store.dispatch(createCollection('testCollection2', 'http://markviss.dev', 'api/v2/test'))
      const state = store.getState().asco
      expect(state.collections.testCollection1.pending).toBe(false)

      let result = reducer(state, {
        type: FETCH,
        payload: {
          name: 'testCollection1',
          collection: [
            { name: 'test1', age: 11 },
            { name: 'test2', age: 22 },
            { name: 'test3', age: 33 }
          ]
        }
      })

      expect(result.collections.testCollection1.collection).toEqual([
        { name: 'test1', age: 11 },
        { name: 'test2', age: 22 },
        { name: 'test3', age: 33 }
      ])
      expect(result.collections.testCollection1.start).toEqual(0)
      expect(result.collections.testCollection1.limit).toEqual(10)
      expect(result.collections.testCollection1.count).toEqual(0)

      result = reducer(state, {
        type: FETCH,
        payload: {
          name: 'testCollection1',
          collection: [
            { name: 'test1', age: 11 },
            { name: 'test2', age: 22 },
            { name: 'test3', age: 33 }
          ],
          start: 5,
          limit: 10,
          count: 3
        }
      })

      expect(result.collections.testCollection1.collection).toEqual([
        { name: 'test1', age: 11 },
        { name: 'test2', age: 22 },
        { name: 'test3', age: 33 }
      ],)
      expect(result.collections.testCollection1.start).toEqual(5)
      expect(result.collections.testCollection1.limit).toEqual(10)
      expect(result.collections.testCollection1.count).toEqual(3)
    })
  })

  describe('get next', () => {
    it('should dispatch pending action', () => {
      store.dispatch(createCollection('testCollection1', 'http://markviss.dev', 'api/v1/test'))
      const getState = () => (store.getState())
      const dispatch = jasmine.createSpy('Dispatch spy')

      next('testCollection1')(dispatch, getState)
        .catch(error => {})
      expect(dispatch).toHaveBeenCalledWith({
        type: '@@redux-asco/FETCH_PENDING', payload: Object({ collectionName: 'testCollection1', pending: true })
      })
    })

  })


})
