import {
  put, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
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
  FORWARD_CAPABILITIES__EDIT_USER,
  FORWARD_CAPABILITIES__FAILURE,

  EDIT_USER__SUCCESS,
  EDIT_USER__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  CREATE_USER__SUCCESS,
  CREATE_USER__FAILURE,
} from '../Actions'
import { newUser } from '../stubs/newUser'
import db from '../db'


export function* continueUserSaga(action) {
  const { isContinue, newUserDB } = action.payload
  try {
    if (isContinue) {
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
    forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3,
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
        forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3,
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
  const quantityPhoneField = yield select(state => state.newUser.quantityPhoneField)
  const { deleteAddField } = action.payload
  try {
    if (deleteAddField === 'add') {
      yield put({
        type: DELETE_ADD_FIELD_PHONE__ADD,
        payload: {
          quantityPhoneField: quantityPhoneField + 1,
        },
      })
    } else if (deleteAddField === 'delete') {
      yield put({
        type: DELETE_ADD_FIELD_PHONE__DELETE,
        payload: {
          quantityPhoneField: quantityPhoneField - 1,
        },
      })
    }
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
  try {
    yield put(push('/ListUsers'))
    if (newUser.idListUser) {
      db.table('listUserDB')
        .update(newUser.idListUser, {
          ...newUser,
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
        if (item.idListUser === newUser.idListUser) {
          indexEditUser = i
        }
      })
      const newUserStart = users.slice(0, indexEditUser)
      const newUserEnd = users.slice(1 + indexEditUser)
      const newObj = [
        ...newUserStart,
        {
          ...newUser,
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
        type: FORWARD_CAPABILITIES__EDIT_USER,
        payload: {
          newObj,
        },
      })
    } else {
      const idListUser = users.length > 0 ? users[users.length - 1].idListUser + 1 : 1
      if (idListUser === 1) {
        db.table('listUserDB')
          .add({
            ...newUser,
            id: 1,
            idListUser,
            selectSkills,
            textareaField,
            checkboxArt,
            checkboxSport,
            checkboxJustWant,
            checkboxFemale,
            checkboxGuitar,
            checkboxWtf,
          })
      } else {
        db.table('listUserDB')
          .add({
            ...newUser,
            idListUser,
            selectSkills,
            textareaField,
            checkboxArt,
            checkboxSport,
            checkboxJustWant,
            checkboxFemale,
            checkboxGuitar,
            checkboxWtf,
          })
      }
      yield put({
        type: FORWARD_CAPABILITIES__ADD_NEW_USER,
        payload: {
          ...newUser,
          idListUser,
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
    }
  } catch
  (error) {
    yield put({
      type: FORWARD_CAPABILITIES__FAILURE,
      error,
    })
  }
}


export function* editUserSaga(action) {
  const { user } = action.payload
  try {
    yield put(push('/EditUser'))
    yield put({
      type: EDIT_USER__SUCCESS,
      payload: {
        ...user,
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
  const { idListUser } = action.payload
  const usersList = yield select(state => state.listUsers.users)
  const users = usersList.filter(item => item.idListUser !== idListUser)
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
    yield put(push('/'))
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
