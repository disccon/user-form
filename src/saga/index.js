import { takeLatest, all } from 'redux-saga/effects'
import {
  continueUserSaga,
  userListerNewStateSaga,
  saveUserSRCAvatarIMGSaga,
  forwardAccountSaga,
  forwardBackProfileSaga,
  forwardBackContactsSaga,
  deleteAddFieldPhoneSaga,
  backCapabilitiesSaga,
  forwardCapabilitiesSaga,
  editUserSaga,
  deleteUserSaga,
  createUserSaga,
} from './saga'


import {
  CONTINUE_USER,
  USER_LISTER_NEW_STATE,
  SAVE_USER_SRC_AVATAR_IMG,
  FORWARD_ACCOUNT,
  FORWARD_BACK_PROFILE,
  FORWARD_BACK_CONTACTS,
  DELETE_ADD_FIELD_PHONE,
  BACK_CAPABILITIES,
  FORWARD_CAPABILITIES,
  EDIT_USER,
  DELETE_USER,
  CREATE_USER,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(USER_LISTER_NEW_STATE, userListerNewStateSaga),
    takeLatest(SAVE_USER_SRC_AVATAR_IMG, saveUserSRCAvatarIMGSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
    takeLatest(FORWARD_BACK_CONTACTS, forwardBackContactsSaga),
    takeLatest(DELETE_ADD_FIELD_PHONE, deleteAddFieldPhoneSaga),
    takeLatest(BACK_CAPABILITIES, backCapabilitiesSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),
    takeLatest(EDIT_USER, editUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(CREATE_USER, createUserSaga),
  ])
}
