
import { createAction, handleActions } from 'redux-actions';
import imm from 'object-path-immutable';

import {
  ASCO_CREATE_COLLECTION,
  ASCO_DESTROY_COLLECTION
} from './constants'

const collectionDefaults = {
  collection: [],
  order: [],
  filter: [],
  start: 0,
  length: 10
}
export const reducer = handleActions({

  [ASCO_CREATE_COLLECTION]: (state, { payload: collectionName }) => {
    return imm(state).set([collectionName], collectionDefaults).value()
  },

  [ASCO_DESTROY_COLLECTION]: (state, { payload: collectionName }) => {

    return imm(state).set([collectionName], collectionDefaults).value()
  }


}, {

  }
)
