import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as ascoReducer, createCollection } from '../src/collection'

const store = createStore(
  combineReducers({ asco: ascoReducer })
)

store.dispatch(createCollection('testCollection', 'http://markviss.dev/api/test'))

console.log(store.getState())
