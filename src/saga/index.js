import { takeLatest, all, throttle } from 'redux-saga/effects'
import {
  saveNewUserDataSaga,
  clearUserSaga,
  changeQuestionStateSaga,
  continueUserSaga,
  changeAvatarAccountSaga,
  forwardCapabilitiesSaga,
} from './newUserSaga'

import {
  fetchUsersSaga,
  deleteUserSaga,
  swapUsersSaga,
} from './usersSaga'

import {
  fetchEditUserSaga,
  saveCropperAvatarSaga,
  changeAvatarAccountEditSaga,
  saveEditUserDataSaga,
} from './editUserSaga'

import {
  SAVE_NEW_USER_DATA,
  CLEAR_USER,
  CHANGE_QUESTION_STATE,
  CONTINUE_USER,
  CHANGE_AVATAR_ACCOUNT,
  FORWARD_CAPABILITIES,
} from '../actions/actionNewUser'

import {
  FETCH_USERS,
  DELETE_USER,
  SWAP_USERS,
} from '../actions/actionUsers'

import {
  FETCH_EDIT_USER,
  CHANGE_AVATAR_ACCOUNT_EDIT,
  SAVE_EDIT_USER_DATA,
  SAVE_CROPPER_AVATAR,
} from '../actions/actionEditUser'

export default function* rootSaga() {
  yield all([
    takeLatest(SAVE_NEW_USER_DATA, saveNewUserDataSaga),
    takeLatest(CLEAR_USER, clearUserSaga),
    takeLatest(CHANGE_QUESTION_STATE, changeQuestionStateSaga),
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT, changeAvatarAccountSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),

    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    throttle(1200, SWAP_USERS, swapUsersSaga),

    takeLatest(FETCH_EDIT_USER, fetchEditUserSaga),
    takeLatest(SAVE_CROPPER_AVATAR, saveCropperAvatarSaga),
    takeLatest(CHANGE_AVATAR_ACCOUNT_EDIT, changeAvatarAccountEditSaga),
    takeLatest(SAVE_EDIT_USER_DATA, saveEditUserDataSaga),
  ])
}
