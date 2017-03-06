/* global describe, beforeEach, afterEach, it, xit */
import { createAction } from 'redux-actions'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer as ascoReducer, createCollection } from '../asco'


describe('Collection', () => {

  let store = {}

  beforeEach(() => {
    store = createStore(
      combineReducers({ asco: ascoReducer }),
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
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://markviss.dev', path: 'api/v1/test'})
    expect(asco.collections.testCollection2).toEqual({
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://markviss.dev', path: 'api/v2/test'})
    expect(asco.collections.testCollection3).toEqual({
      collection: [], order: [], filter: [], start: 0, length: 10, host: 'http://www.test.com', path: 'api/v6/test'})
  })

  xit('should create new collection with default values', () => {
    const state = {
      collections: {},
      defaultHost: '',
      defaultPath: ''
    }
    //const updatedState = ascoReducer(state, createCollection('myCollection'))

    //console.log(updatedState)
    /*
    expect(updatedState).toEqual({
      myCollection: {
        collection: [],
        order: [],
        filter: [],
        start: 0,
        length: 10
      }
    })*/
  })

  xit('should create new collection with default values', () => {
    reducer(state, createCollection('myCollection'))
    const updatedState = reducer(state, destroyCollection('myCollection'))

    console.log(updatedState)
  })

})
