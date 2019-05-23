import {
  put, call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,

  SAVE_CHANGES_ACCOUNT_EDITING__FAILURE,
  SAVE_CHANGES_PROFILE_EDITING__FAILURE,
  SAVE_CHANGES_CONTACTS_EDITING__FAILURE,
  SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE,
} from '../actions/actionEditUser'
import db from '../db'
import { getEditUserIndexDB } from '../helpers/getEditUserIndexDB'

export function* fetchEditUserSaga(action) {
  const { id } = action.payload
  try {
    const editUser = yield call(getEditUserIndexDB, id)
    if (editUser) {
      yield put({
        type: FETCH_EDIT_USER__SUCCESS,
        payload: {
          editUser,
        },
      })
    } else {
      yield put(push('/not-found'))
    }
  } catch (error) {
    yield put(push('/not-found'))
    yield put({
      type: FETCH_EDIT_USER__FAILURE,
      error,
    })
  }
}

export function* changeAvatarAccountEditingSaga(action) {
  const { userSRCAvatarIMG } = action.payload
  try {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
      payload: {
        userSRCAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveChangesAccountEditingSaga(action) {
  const {
    userName, password, repeatPassword, userSRCAvatarIMG, id,
  } = action.payload
  try {
    db.usersDB.update(id, {
      userName,
      password,
      repeatPassword,
      userSRCAvatarIMG,
      lastUpdate: new Date(),
    })
    yield put(push(`/user/${id}`))
  } catch
  (error) {
    yield put({
      type: SAVE_CHANGES_ACCOUNT_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveChangesProfileSaga(action) {
  const {
    firstName, lastName, birthDate, email, address, gender, id,
  } = action.payload
  try {
    db.usersDB.update(id, {
      firstName,
      lastName,
      birthDate,
      email,
      address,
      gender,
      lastUpdate: new Date(),
    })
    yield put(push(`/user/${id}`))
  } catch
  (error) {
    yield put({
      type: SAVE_CHANGES_PROFILE_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveChangesContactsSaga(action) {
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, id,
  } = action.payload
  try {
    db.usersDB.update(id, {
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
      lastUpdate: new Date(),
    })
    yield put(push(`/user/${id}`))
  } catch
  (error) {
    yield put({
      type: SAVE_CHANGES_CONTACTS_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveChangesCapabilitiesSaga(action) {
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport,
    checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf, id,
  } = action.payload
  try {
    db.usersDB.update(id, {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
      lastUpdate: new Date(),
    })
    yield put(push(`/user/${id}`))
  } catch
  (error) {
    yield put({
      type: SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE,
      error,
    })
  }
}
