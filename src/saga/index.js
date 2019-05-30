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
} from './usersSaga'

import {
  fetchEditUserSaga,
  saveCropperAvatarSaga,
  changeAvatarAccountEditingSaga,
  saveEditUserDataSaga,
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
} from '../actions/actionUsers'

import {
  FETCH_EDIT_USER,
  CHANGE_AVATAR_ACCOUNT_EDITING,
  SAVE_EDIT_USER_DATA,
  SAVE_CROPPER_AVATAR,
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

    takeLatest(FETCH_EDIT_USER, fetchEditUserSaga),
    takeLatest(SAVE_CROPPER_AVATAR, saveCropperAvatarSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT_EDITING, changeAvatarAccountEditingSaga),
    takeLatest(SAVE_EDIT_USER_DATA, saveEditUserDataSaga),
  ])
}
