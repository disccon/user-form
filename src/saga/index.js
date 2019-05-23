import { takeLatest, all } from 'redux-saga/effects'
import {
  createUserSaga,
  changeQuestionStateSaga,
  continueUserSaga,
  changeAvatarAccountSaga,
  forwardAccountSaga,
  forwardBackProfileSaga,
  forwardBackContactsSaga,
  deleteAddFieldPhoneSaga,
  backCapabilitiesSaga,
  forwardCapabilitiesSaga,
} from './newUserSaga'

import {
  fetchUsersSaga,
  deleteUserSaga,
  searchingUsersSaga,
} from './usersSaga'

import {
  fetchEditUserSaga,
  changeAvatarAccountEditingSaga,
  saveChangesAccountEditingSaga,
  saveChangesProfileSaga,
  deleteFieldPhoneEditingSaga,
  saveChangesContactsSaga,
  saveChangesCapabilitiesSaga,
} from './editUserSaga'

import {
  CREATE_USER,
  CHANGE_QUESTION_STATE,
  CONTINUE_USER,
  CHANGE_AVATAR_ACCOUNT,
  FORWARD_ACCOUNT,
  FORWARD_BACK_PROFILE,
  FORWARD_BACK_CONTACTS,
  DELETE_ADD_FIELD_PHONE,
  BACK_CAPABILITIES,
  FORWARD_CAPABILITIES,
} from '../actions/actionNewUser'

import {
  FETCH_USERS,
  DELETE_USER,
  SEARCHING_USERS,
} from '../actions/actionUsers'

import {
  FETCH_EDIT_USER,
  CHANGE_AVATAR_ACCOUNT_EDITING,
  SAVE_CHANGES_ACCOUNT_EDITING,
  SAVE_CHANGES_PROFILE_EDITING,
  DELETE_FIELD_PHONE_EDITING,
  SAVE_CHANGES_CONTACTS_EDITING,
  SAVE_CHANGES_CAPABILITIES_EDITING,
} from '../actions/actionEditUser'

export default function* rootSaga() {
  yield all([
    takeLatest(CREATE_USER, createUserSaga),
    takeLatest(CHANGE_QUESTION_STATE, changeQuestionStateSaga),
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT, changeAvatarAccountSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
    takeLatest(FORWARD_BACK_CONTACTS, forwardBackContactsSaga),
    takeLatest(DELETE_ADD_FIELD_PHONE, deleteAddFieldPhoneSaga),
    takeLatest(BACK_CAPABILITIES, backCapabilitiesSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),

    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(SEARCHING_USERS, searchingUsersSaga),

    takeLatest(FETCH_EDIT_USER, fetchEditUserSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT_EDITING, changeAvatarAccountEditingSaga),
    takeLatest(SAVE_CHANGES_ACCOUNT_EDITING, saveChangesAccountEditingSaga),
    takeLatest(SAVE_CHANGES_PROFILE_EDITING, saveChangesProfileSaga),
    takeLatest(DELETE_FIELD_PHONE_EDITING, deleteFieldPhoneEditingSaga),
    takeLatest(SAVE_CHANGES_CONTACTS_EDITING, saveChangesContactsSaga),
    takeLatest(SAVE_CHANGES_CAPABILITIES_EDITING, saveChangesCapabilitiesSaga),
  ])
}
