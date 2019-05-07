import {
  put, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'

import {
  CHANGE_QUESTION_STATE__OPEN,
  CHANGE_QUESTION_STATE__CLOSE,
  CHANGE_QUESTION_STATE__FAILURE,

  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  USER_LISTER_NEW_STATE__SUCCESS,
  USER_LISTER_NEW_STATE__FAILURE,

  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,

  FORWARD_BACK_CONTACTS__FORWARD,
  FORWARD_BACK_CONTACTS__BACK,
  FORWARD_BACK_CONTACTS__FAILURE,

  DELETE_ADD_FIELD_PHONE__ADD,
  DELETE_ADD_FIELD_PHONE__DELETE,
  DELETE_ADD_FIELD_PHONE__FAILURE,

  BACK_CAPABILITIES__SUCCESS,
  BACK_CAPABILITIES__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__FAILURE,

  EDIT_USER__SUCCESS,
  EDIT_USER__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  CREATE_USER__SUCCESS,
  CREATE_USER__FAILURE,

  SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  SAVE_AVATAR_ACCOUNT_EDITING__FAILURE,

  ACCOUNT_EDITING_SAVE__SUCCESS,
  ACCOUNT_EDITING_SAVE__FAILURE,

  PROFILE_EDITING_SAVE__SUCCESS,
  PROFILE_EDITING_SAVE__FAILURE,

  CONTACTS_EDITING_SAVE__SUCCESS,
  CONTACTS_EDITING_SAVE__FAILURE,

  CAPABILITIES_EDITING_SAVE__SUCCESS,
  CAPABILITIES_EDITING_SAVE__FAILURE,
} from '../Actions'
import { newUser } from '../stubs/newUser'
import db from '../db'


export function* changeQuestionStateSaga(action) {
  const { isQuestion } = action.payload
  try {
    if (isQuestion) {
      yield put({
        type: CHANGE_QUESTION_STATE__CLOSE,
      })
    } else {
      yield put({
        type: CHANGE_QUESTION_STATE__OPEN,
        payload: {
          isQuestion: true,
        },
      })
    }
  } catch (error) {
    yield put({
      type: CHANGE_QUESTION_STATE__FAILURE,
      error,
    })
  }
}

export function* continueUserSaga(action) {
  const { isContinue } = action.payload
  try {
    if (isContinue) {
      const promise = new Promise(resolve => {
        db.newUserDB.toArray(newUserDB => resolve(...newUserDB))
      })
      const newUserDB = yield promise
      yield put({
        type: CONTINUE_USER__CONTINUE,
        payload: {
          newUserDB,
        },
      })
    } else {
      yield put({
        type: CONTINUE_USER__CLOSE,
        payload: {
          isQuestion: false,
        },
      })
    }
  } catch (error) {
    yield put({
      type: CONTINUE_USER__FAILURE,
      error,
    })
  }
}

export function* userListerNewStateSaga(action) {
  const { userLister } = action.payload
  try {
    yield put({
      type: USER_LISTER_NEW_STATE__SUCCESS,
      payload: {
        userLister,
      },
    })
  } catch (error) {
    yield put({
      type: USER_LISTER_NEW_STATE__FAILURE,
      error,
    })
  }
}

export function* saveUserSRCAvatarIMGSaga(action) {
  const { userSRCAvatarIMG } = action.payload
  try {
    yield put({
      type: SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
      payload: {
        userSRCAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_USER_SRC_AVATAR_IMG__FAILURE,
      error,
    })
  }
}

export function* forwardAccountSaga(action) {
  const {
    userName, password, repeatPassword,
  } = action.payload
  try {
    yield put(push('/Profile'))
    yield put({
      type: FORWARD_ACCOUNT__SUCCESS,
      payload: {
        userName, password, repeatPassword,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_ACCOUNT__FAILURE,
      error,
    })
  }
}

export function* forwardBackProfileSaga(action) {
  const {
    forwardBack, firstName, lastName, birthDate, email, address, gender,
  } = action.payload
  try {
    let actionType
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_PROFILE__BACK
      yield put(push('/'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_PROFILE__FORWARD
      yield put(push('/Contacts'))
    }
    yield put({
      type: actionType,
      payload: {
        firstName, lastName, birthDate, email, address, gender,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_BACK_PROFILE__FAILURE,
      error,
    })
  }
}

export function* forwardBackContactsSaga(action) {
  const {
    forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
  } = action.payload
  try {
    let actionType
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_CONTACTS__BACK
      yield put(push('/Profile'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_CONTACTS__FORWARD
      yield put(push('/Capabilities'))
    }
    yield put({
      type: actionType,
      payload: {
        forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_BACK_CONTACTS__FAILURE,
      error,
    })
  }
}

export function* deleteAddFieldPhoneSaga(action) {
  const { deleteAddField } = action.payload
  const phoneArray = yield select(state => state.newUser.phoneArray)
  let type
  try {
    if (deleteAddField === 'add') {
      phoneArray.push('')
      type = DELETE_ADD_FIELD_PHONE__ADD
    } else {
      phoneArray.pop('')
      type = DELETE_ADD_FIELD_PHONE__DELETE
    }
    yield put({
      type,
      payload: {
        phoneArray,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_ADD_FIELD_PHONE__FAILURE,
      error,
    })
  }
}

export function* backCapabilitiesSaga(action) {
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
    checkboxFemale, checkboxGuitar, checkboxWtf,
  } = action.payload
  try {
    yield put(push('/Contacts'))
    yield put({
      type: BACK_CAPABILITIES__SUCCESS,
      payload: {
        selectSkills,
        textareaField,
        checkboxArt,
        checkboxSport,
        checkboxJustWant,
        checkboxFemale,
        checkboxGuitar,
        checkboxWtf,
      },
    })
  } catch (error) {
    yield put({
      type: BACK_CAPABILITIES__FAILURE,
      error,
    })
  }
}

export function* forwardCapabilitiesSaga(action) {
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
    checkboxFemale, checkboxGuitar, checkboxWtf,
  } = action.payload
  const newUser = yield select(state => state.newUser)
  const users = yield select(state => state.listUsers.users)
  delete newUser.isQuestion
  try {
    yield put(push('/ListUsers'))
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1
    db.listUserDB.add({
      ...newUser,
      id,
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
    })
    yield put({
      type: FORWARD_CAPABILITIES__ADD_NEW_USER,
      payload: {
        ...newUser,
        id,
        selectSkills,
        textareaField,
        checkboxArt,
        checkboxSport,
        checkboxJustWant,
        checkboxFemale,
        checkboxGuitar,
        checkboxWtf,
      },
    })
  } catch
  (error) {
    yield put({
      type: FORWARD_CAPABILITIES__FAILURE,
      error,
    })
  }
}

export function* editUserSaga(action) {
  const { id, page } = action.payload
  try {
    yield put(push(`/Editing/${id}${page}`))
    const users = yield select(state => state.listUsers.users)
    const newUser = users.find(i => i.id === id)
    yield put({
      type: EDIT_USER__SUCCESS,
      payload: {
        ...newUser,
        isQuestion: false,
      },
    })
  } catch (error) {
    yield put({
      type: EDIT_USER__FAILURE,
      error,
    })
  }
}

export function* deleteUserSaga(action) {
  const { id } = action.payload
  const usersList = yield select(state => state.listUsers.users)
  const users = usersList.filter(item => item.id !== id)
  try {
    yield put({
      type: DELETE_USER__SUCCESS,
      payload: users,
    })
  } catch (error) {
    yield put({
      type: DELETE_USER__FAILURE,
      error,
    })
  }
}

export function* createUserSaga() {
  try {
    yield put({
      type: CREATE_USER__SUCCESS,
      payload: {
        ...newUser,
        isQuestion: false,
      },
    })
  } catch (error) {
    yield put({
      type: CREATE_USER__FAILURE,
      error,
    })
  }
}


export function* saveAvatarAccountEditingSaga(action) {
  const {
    userSRCAvatarIMGState, id,
  } = action.payload
  const users = yield select(state => state.listUsers.users)
  const user = users[id - 1]
  try {
    db.listUserDB.update(id, {
      userSRCAvatarIMGState,
    })
    let indexEditUser
    users.forEach((item, i) => {
      if (item.id === id) {
        indexEditUser = i
      }
    })
    const newUserStart = users.slice(0, indexEditUser)
    const newUserEnd = users.slice(1 + indexEditUser)
    const newListUsers = [
      ...newUserStart,
      {
        ...user,
        userSRCAvatarIMGState,
      },
      ...newUserEnd,
    ]
    yield put({
      type: SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS,
      payload: {
        newListUsers,
      },
    })
  } catch
  (error) {
    yield put({
      type: SAVE_AVATAR_ACCOUNT_EDITING__FAILURE,
      error,
    })
  }
}

export function* accountEditingSaveSaga(action) {
  const {
    userName, password, repeatPassword, userSRCAvatarIMGState, id,
  } = action.payload
  const users = yield select(state => state.listUsers.users)
  const user = users[id - 1]
  try {
    yield put(push(`/Editing/${id}/Profile`))
    db.listUserDB.update(id, {
      userName,
      password,
      repeatPassword,
      userSRCAvatarIMGState,
    })
    let indexEditUser
    users.forEach((item, i) => {
      if (item.id === id) {
        indexEditUser = i
      }
    })
    const newUserStart = users.slice(0, indexEditUser)
    const newUserEnd = users.slice(1 + indexEditUser)
    const newListUsers = [
      ...newUserStart,
      {
        ...user,
        userName,
        password,
        repeatPassword,
        userSRCAvatarIMGState,
      },
      ...newUserEnd,
    ]
    yield put({
      type: ACCOUNT_EDITING_SAVE__SUCCESS,
      payload: {
        newListUsers,
      },
    })
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
  const users = yield select(state => state.listUsers.users)
  const user = users[id - 1]
  try {
    yield put(push(`/Editing/${id}/Contacts`))
    db.listUserDB.update(id, {
      firstName,
      lastName,
      birthDate,
      email,
      address,
      gender,
    })
    let indexEditUser
    users.forEach((item, i) => {
      if (item.id === id) {
        indexEditUser = i
      }
    })
    const newUserStart = users.slice(0, indexEditUser)
    const newUserEnd = users.slice(1 + indexEditUser)
    const newListUsers = [
      ...newUserStart,
      {
        ...user,
        firstName,
        lastName,
        birthDate,
        email,
        address,
        gender,
      },
      ...newUserEnd,
    ]
    yield put({
      type: PROFILE_EDITING_SAVE__SUCCESS,
      payload: {
        newListUsers,
      },
    })
  } catch
  (error) {
    yield put({
      type: PROFILE_EDITING_SAVE__FAILURE,
      error,
    })
  }
}


export function* contactsEditingSaveSaga(action) {
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2,
    phoneN3, id,
  } = action.payload
  const users = yield select(state => state.listUsers.users)
  const user = users[id - 1]
  try {
    yield put(push(`/Editing/${id}/Capabilities`))
    db.listUserDB.update(id, {
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
      phoneN1,
      phoneN2,
      phoneN3,
    })
    let indexEditUser
    users.forEach((item, i) => {
      if (item.id === id) {
        indexEditUser = i
      }
    })
    const newUserStart = users.slice(0, indexEditUser)
    const newUserEnd = users.slice(1 + indexEditUser)
    const newListUsers = [
      ...newUserStart,
      {
        ...user,
        company,
        githubLink,
        facebookLink,
        selectLanguage,
        fax,
        phoneArray,
        phoneN1,
        phoneN2,
        phoneN3,
      },
      ...newUserEnd,
    ]
    yield put({
      type: CONTACTS_EDITING_SAVE__SUCCESS,
      payload: {
        newListUsers,
      },
    })
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
  const users = yield select(state => state.listUsers.users)
  const user = users[id - 1]
  try {
    yield put(push(`/EditUser/${id}`))
    db.listUserDB.update(id, {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
    })
    let indexEditUser
    users.forEach((item, i) => {
      if (item.id === id) {
        indexEditUser = i
      }
    })
    const newUserStart = users.slice(0, indexEditUser)
    const newUserEnd = users.slice(1 + indexEditUser)
    const newListUsers = [
      ...newUserStart,
      {
        ...user,
        selectSkills,
        textareaField,
        checkboxArt,
        checkboxSport,
        checkboxJustWant,
        checkboxFemale,
        checkboxGuitar,
        checkboxWtf,
      },
      ...newUserEnd,
    ]
    yield put({
      type: CAPABILITIES_EDITING_SAVE__SUCCESS,
      payload: {
        newListUsers,
      },
    })
  } catch
  (error) {
    yield put({
      type: CAPABILITIES_EDITING_SAVE__FAILURE,
      error,
    })
  }
}
