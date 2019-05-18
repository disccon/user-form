import {
  put, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'

import {
  USER_EDIT_STATE__SUCCESS,
  USER_EDIT_STATE__FAILURE,

  SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  SAVE_AVATAR_ACCOUNT_EDITING__FAILURE,

  DELETE_FIELD_PHONE_EDITING__ADD,
  DELETE_FIELD_PHONE_EDITING__DELETE,
  DELETE_FIELD_PHONE_EDITING__FAILURE,

  ACCOUNT_EDITING_SAVE__FAILURE,
  PROFILE_EDITING_SAVE__FAILURE,
  CONTACTS_EDITING_SAVE__FAILURE,
  CAPABILITIES_EDITING_SAVE__FAILURE,
} from '../actions'
import db from '../db'


export function* userEditStateSaga(action) {
  const { editUser } = action.payload
  try {
    yield put({
      type: USER_EDIT_STATE__SUCCESS,
      payload: {
        editUser,
      },
    })
  } catch (error) {
    yield put({
      type: USER_EDIT_STATE__FAILURE,
      error,
    })
  }
}


export function* saveAvatarAccountEditingSaga(action) {
  const { userSRCAvatarIMG, id } = action.payload
  db.usersDB.update(id, {
    userSRCAvatarIMG,
  })
  try {
    yield put({
      type: SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS,
      payload: {
        userSRCAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_AVATAR_ACCOUNT_EDITING__FAILURE,
      error,
    })
  }
}

export function* accountEditingSaveSaga(action) {
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
      type: ACCOUNT_EDITING_SAVE__FAILURE,
      error,
    })
  }
}


export function* profileEditingSaveSaga(action) {
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
      type: PROFILE_EDITING_SAVE__FAILURE,
      error,
    })
  }
}

export function* deleteFieldPhoneEditingSaga(action) {
  const { deleteAddField, phoneN1Form } = action.payload
  let { phoneN2Form, phoneN3Form } = action.payload
  const phoneArray = yield select(state => state.editUserReducer.editUser.phoneArray)
  let type
  try {
    if (deleteAddField === 'add' && phoneArray.length < 3) {
      phoneArray.push('')
      type = DELETE_FIELD_PHONE_EDITING__ADD
    } else if (deleteAddField === 'delete' && phoneArray.length > 1) {
      phoneArray.pop('')
      type = DELETE_FIELD_PHONE_EDITING__DELETE
    }
    if (phoneArray.length > 1) {
      phoneN3Form = ''
    } else {
      phoneN2Form = ''
      phoneN3Form = ''
    }
    yield put({
      type,
      payload: {
        phoneArray,
        phoneN1: phoneN1Form,
        phoneN2: phoneN2Form,
        phoneN3: phoneN3Form,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_FIELD_PHONE_EDITING__FAILURE,
      error,
    })
  }
}

export function* contactsEditingSaveSaga(action) {
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
      type: CONTACTS_EDITING_SAVE__FAILURE,
      error,
    })
  }
}

export function* capabilitiesEditingSaveSaga(action) {
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
      type: CAPABILITIES_EDITING_SAVE__FAILURE,
      error,
    })
  }
}
