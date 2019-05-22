import {
  put, call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,

  DELETE_FIELD_PHONE_EDITING__ADD,
  DELETE_FIELD_PHONE_EDITING__DELETE,
  DELETE_FIELD_PHONE_EDITING__FAILURE,

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

export function* deleteFieldPhoneEditingSaga(action) {
  const {
    deleteAddField, company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1,
  } = action.payload
  let { phoneN2, phoneN3 } = action.payload
  const newPhoneArray = [...phoneArray]
  let type
  try {
    if (deleteAddField === 'add' && phoneArray.length < 3) {
      phoneN2 = phoneArray.length === 1 ? '' : phoneN2
      phoneN3 = phoneArray.length === 2 ? '' : phoneN3
      newPhoneArray.push('')
      type = DELETE_FIELD_PHONE_EDITING__ADD
    } else if (deleteAddField === 'delete' && phoneArray.length > 1) {
      phoneN2 = phoneArray.length === 2 ? null : phoneN2
      phoneN3 = null
      newPhoneArray.pop('')
      type = DELETE_FIELD_PHONE_EDITING__DELETE
    }
    yield put({
      type,
      payload: {
        company,
        githubLink,
        facebookLink,
        selectLanguage,
        fax,
        phoneArray: newPhoneArray,
        phoneN1,
        phoneN2,
        phoneN3,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_FIELD_PHONE_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveChangesContactsSaga(action) {
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2,
    phoneN3, id,
  } = action.payload
  try {
    db.usersDB.update(id, {
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
      phoneN1,
      phoneN2,
      phoneN3,
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
