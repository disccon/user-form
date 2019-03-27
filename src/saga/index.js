import { takeLatest, all } from 'redux-saga/effects'
import {
  changeNameTextFieldSaga,
} from './saga'

import {
  CHANGE_NAME_TEXT_FIELD,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CHANGE_NAME_TEXT_FIELD, changeNameTextFieldSaga),
  ])
}
