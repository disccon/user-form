import { takeLatest, all } from 'redux-saga/effects'
import {
  saveUserSRCAvatarIMGSaga,
  forwardAccountSaga,
  saveBirthDateSaga,
  saveGenderInputSaga,
  forwardBackProfileSaga,
} from './saga'

import {
  SAVE_USER_SRC_AVATAR_IMG,
  FORWARD_ACCOUNT,
  SAVE_BIRTH_DATE,
  SAVE_GENDER_INPUT,
  FORWARD_BACK_PROFILE,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(SAVE_USER_SRC_AVATAR_IMG, saveUserSRCAvatarIMGSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(SAVE_BIRTH_DATE, saveBirthDateSaga),
    takeLatest(SAVE_GENDER_INPUT, saveGenderInputSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
  ])
}
