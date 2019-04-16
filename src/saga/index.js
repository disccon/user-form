import { takeLatest, all } from 'redux-saga/effects'
import {
  continueUserSaga,
  saveUserSRCAvatarIMGSaga,
  forwardAccountSaga,
  forwardBackProfileSaga,
  forwardBackContactsSaga,
  deleteAddFieldPhoneSaga,
  forwardBackCapabilitiesSaga,
} from './saga'



import {
  CONTINUE_USER,
  SAVE_USER_SRC_AVATAR_IMG,
  FORWARD_ACCOUNT,
  FORWARD_BACK_PROFILE,
  FORWARD_BACK_CONTACTS,
  DELETE_ADD_FIELD_PHONE,
  FORWARD_BACK_CAPABILITIES,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(SAVE_USER_SRC_AVATAR_IMG, saveUserSRCAvatarIMGSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
    takeLatest(FORWARD_BACK_CONTACTS, forwardBackContactsSaga),
    takeLatest(DELETE_ADD_FIELD_PHONE, deleteAddFieldPhoneSaga),
    takeLatest(FORWARD_BACK_CAPABILITIES, forwardBackCapabilitiesSaga),
  ])
}
