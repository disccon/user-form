import { takeLatest, all } from 'redux-saga/effects'
import {
  changeQuestionStateSaga,
  continueUserSaga,
  saveUserSRCAvatarIMGSaga,
  forwardAccountSaga,
  forwardBackProfileSaga,
  forwardBackContactsSaga,
  deleteAddFieldPhoneSaga,
  backCapabilitiesSaga,
  forwardCapabilitiesSaga,
  fetchUsersDBSaga,
  deleteUserSaga,
  searchingUsersSaga,
  createUserSaga,
  userEditStateSaga,
  saveAvatarAccountEditingSaga,
  accountEditingSaveSaga,
  profileEditingSaveSaga,
  deleteFieldPhoneEditingSaga,
  contactsEditingSaveSaga,
  capabilitiesEditingSaveSaga,
} from './saga'


import {
  CHANGE_QUESTION_STATE,
  CONTINUE_USER,
  SAVE_USER_SRC_AVATAR_IMG,
  FORWARD_ACCOUNT,
  FORWARD_BACK_PROFILE,
  FORWARD_BACK_CONTACTS,
  DELETE_ADD_FIELD_PHONE,
  BACK_CAPABILITIES,
  FORWARD_CAPABILITIES,
  FETCH_USERS,
  DELETE_USER,
  SEARCHING_USERS,
  CREATE_USER,
  USER_EDIT_STATE,
  SAVE_AVATAR_ACCOUNT_EDITING,
  ACCOUNT_EDITING_SAVE,
  PROFILE_EDITING_SAVE,
  DELETE_FIELD_PHONE_EDITING,
  CONTACTS_EDITING_SAVE,
  CAPABILITIES_EDITING_SAVE,
} from '../actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CHANGE_QUESTION_STATE, changeQuestionStateSaga),
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(SAVE_USER_SRC_AVATAR_IMG, saveUserSRCAvatarIMGSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
    takeLatest(FORWARD_BACK_CONTACTS, forwardBackContactsSaga),
    takeLatest(DELETE_ADD_FIELD_PHONE, deleteAddFieldPhoneSaga),
    takeLatest(BACK_CAPABILITIES, backCapabilitiesSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),
    takeLatest(CREATE_USER, createUserSaga),
    takeLatest(FETCH_USERS, fetchUsersDBSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(SEARCHING_USERS, searchingUsersSaga),
    takeLatest(USER_EDIT_STATE, userEditStateSaga),
    takeLatest(SAVE_AVATAR_ACCOUNT_EDITING, saveAvatarAccountEditingSaga),
    takeLatest(ACCOUNT_EDITING_SAVE, accountEditingSaveSaga),
    takeLatest(PROFILE_EDITING_SAVE, profileEditingSaveSaga),
    takeLatest(DELETE_FIELD_PHONE_EDITING, deleteFieldPhoneEditingSaga),
    takeLatest(CONTACTS_EDITING_SAVE, contactsEditingSaveSaga),
    takeLatest(CAPABILITIES_EDITING_SAVE, capabilitiesEditingSaveSaga),
  ])
}
