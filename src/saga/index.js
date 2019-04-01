import { takeLatest, all } from 'redux-saga/effects'
import {
  forwardAccountSaga,
  saveBirthDateSaga,
  saveGenderInputSaga,
} from './saga'

import {
  FORWARD_ACCOUNT,
  SAVE_BIRTH_DATE,
  SAVE_GENDER_INPUT,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(SAVE_BIRTH_DATE, saveBirthDateSaga),
    takeLatest(SAVE_GENDER_INPUT, saveGenderInputSaga),
  ])
}
