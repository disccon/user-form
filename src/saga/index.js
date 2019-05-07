import { takeLatest, all } from 'redux-saga/effects'
import {
  changeQuestionStateSaga,
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
  saveAvatarAccountEditingSaga,
  accountEditingSaveSaga,
  profileEditingSaveSaga,
  contactsEditingSaveSaga,
  capabilitiesEditingSaveSaga,
} from './saga'


import {
  CHANGE_QUESTION_STATE,
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
  SAVE_AVATAR_ACCOUNT_EDITING,
  ACCOUNT_EDITING_SAVE,
  PROFILE_EDITING_SAVE,
  CONTACTS_EDITING_SAVE,
  CAPABILITIES_EDITING_SAVE,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CHANGE_QUESTION_STATE, changeQuestionStateSaga),
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
    takeLatest(SAVE_AVATAR_ACCOUNT_EDITING, saveAvatarAccountEditingSaga),
    takeLatest(ACCOUNT_EDITING_SAVE, accountEditingSaveSaga),
    takeLatest(PROFILE_EDITING_SAVE, profileEditingSaveSaga),
    takeLatest(CONTACTS_EDITING_SAVE, contactsEditingSaveSaga),
    takeLatest(CAPABILITIES_EDITING_SAVE, capabilitiesEditingSaveSaga),
  ])
}
