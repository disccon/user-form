import { takeLatest, all } from 'redux-saga/effects'
import {
  saveNewUserDataSaga,
  createUserSaga,
  changeQuestionStateSaga,
  continueUserSaga,
  changeAvatarAccountSaga,
  forwardCapabilitiesSaga,
} from './newUserSaga'

import {
  fetchUsersSaga,
  deleteUserSaga,
  searchingUsersSaga,
  loadingIntervalSaga,
} from './usersSaga'

import {
  fetchEditUserSaga,
  changeAvatarAccountEditingSaga,
  saveChangesAccountEditingSaga,
  saveChangesProfileSaga,
  saveChangesContactsSaga,
  saveChangesCapabilitiesSaga,
} from './editUserSaga'

import {
  SAVE_NEW_USER_DATA,
  CREATE_USER,
  CHANGE_QUESTION_STATE,
  CONTINUE_USER,
  CHANGE_AVATAR_ACCOUNT,
  FORWARD_CAPABILITIES,
} from '../actions/actionNewUser'

import {
  FETCH_USERS,
  DELETE_USER,
  SEARCHING_USERS,
  LOADING_INTERVAL,
} from '../actions/actionUsers'

import {
  FETCH_EDIT_USER,
  CHANGE_AVATAR_ACCOUNT_EDITING,
  SAVE_CHANGES_ACCOUNT_EDITING,
  SAVE_CHANGES_PROFILE_EDITING,
  SAVE_CHANGES_CONTACTS_EDITING,
  SAVE_CHANGES_CAPABILITIES_EDITING,
} from '../actions/actionEditUser'

export default function* rootSaga() {
  yield all([
    takeLatest(SAVE_NEW_USER_DATA, saveNewUserDataSaga),
    takeLatest(CREATE_USER, createUserSaga),
    takeLatest(CHANGE_QUESTION_STATE, changeQuestionStateSaga),
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT, changeAvatarAccountSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),

    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(SEARCHING_USERS, searchingUsersSaga),
    takeLatest(LOADING_INTERVAL, loadingIntervalSaga),

    takeLatest(FETCH_EDIT_USER, fetchEditUserSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT_EDITING, changeAvatarAccountEditingSaga),
    takeLatest(SAVE_CHANGES_ACCOUNT_EDITING, saveChangesAccountEditingSaga),
    takeLatest(SAVE_CHANGES_PROFILE_EDITING, saveChangesProfileSaga),
    takeLatest(SAVE_CHANGES_CONTACTS_EDITING, saveChangesContactsSaga),
    takeLatest(SAVE_CHANGES_CAPABILITIES_EDITING, saveChangesCapabilitiesSaga),
  ])
}
