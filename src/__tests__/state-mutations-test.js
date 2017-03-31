/* global describe, beforeEach, afterEach, it, xit */

import {
  setDefaultHost,
  setDefaultPath,
  getHost,
  getPath,
  addCollection,
  hasCollection
} from '../state-mutations'

describe('State mutations', () => {

  it('should set a new default host', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    const newState = setDefaultHost(state, 'http://localhost.dev:8080')
    expect(newState.defaultHost).toBe('http://localhost.dev:8080')

    const newState2 = setDefaultHost(newState, '')
    expect(newState2.defaultHost).toBe('http://localhost.dev:8080')

  })

  it('should set a new default path', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    const newState = setDefaultPath(state, '/api/v2')
    expect(newState.defaultPath).toBe('/api/v2')

    const newState2 = setDefaultPath(newState, '')
    expect(newState2.defaultPath).toBe('/api/v2')
  })

  it('should return host', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    expect(getHost({ collections: {}, defaultHost: '', defaultPath: '' }, 'myCollection')).toEqual('')
    expect(getHost({ collections: {}, defaultHost: 'testHost', defaultPath: '' }, 'myCollection')).toEqual('testHost')

    const collection = {
      name: 'myCollection',
      collection: [],
      order: [],
      filter: [],
      start: 0,
      length: 10,
      count: 0,
      host: 'http://localhost.dev:8080',
      path: '/api/v1'
    }

    let newState = addCollection(state, {
      name: 'myCollection',
      host: 'http://localhost.dev:8080',
      path: '/api/v1'
    })

    expect(getHost(newState, 'myCollection')).toEqual('http://localhost.dev:8080')

    newState = addCollection(state, {
      name: 'myCollection'
    })

    expect(getHost(newState, 'myCollection')).toEqual('')

  })

  it('should return path', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    expect(getPath({ collections: {}, defaultHost: '', defaultPath: '' }, 'myCollection')).toEqual('')
    expect(getPath({ collections: {}, defaultHost: '', defaultPath: 'testPath' }, 'myCollection')).toEqual('testPath')

    let newState = addCollection(state, {
      name: 'myCollection',
      host: 'http://localhost.dev:8080',
      path: '/api/v1'
    })
    expect(getPath(newState, 'myCollection')).toEqual('/api/v1')

    newState = addCollection(state, {
      name: 'myCollection',
      host: 'http://localhost.dev:8080',
    })

    expect(getPath(newState, 'myCollection')).toEqual('')
  })

  it('should check if collection exists or not', () => {
    const collections = {
      myCollection1: {},
      myCollection2: {},
      myCollection3: {},
      myCollection4: {},
      myCollection5: {},
    }

    let state = { collections: {}, defaultHost: '', defaultPath: '' }

    expect(hasCollection(state, 'myCollection3')).toBeFalsy()
    expect(hasCollection(state)).toBeFalsy()

    state = { collections, defaultHost: '', defaultPath: '' }

    expect(hasCollection(state, 'test')).toBeFalsy()
    expect(hasCollection(state, 'myCollection3')).toBeTruthy()
  })

  it('should add a collection', () => {
    const state = { collections: {}, defaultHost: '', defaultPath: '' }
    const collection = {
      name: 'myCollection',
      collection: [],
      order: [],
      filter: [],
      start: 0,
      limit: 10,
      count: 0,
      host: 'http://localhost.dev:8080',
      path: '/api/v1'
    }

    const newState = addCollection(state, collection)

    expect(newState.collections.myCollection).toEqual(collection)
    expect(newState.defaultHost).toEqual('http://localhost.dev:8080')
    expect(newState.defaultPath).toEqual('/api/v1')
  })
})
