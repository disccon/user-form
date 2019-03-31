import { takeLatest, all } from 'redux-saga/effects'
import {
  forwardAccountSaga,
} from './saga'

import {

  FORWARD_ACCOUNT,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
  ])
}
