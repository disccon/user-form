import {
  put, select, call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'

import {
  CHANGE_QUESTION_STATE__OPEN,
  CHANGE_QUESTION_STATE__CLOSE,
  CHANGE_QUESTION_STATE__FAILURE,

  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

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

  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SEARCHING_USERS__SUCCESS,
  SEARCHING_USERS__FAILURE,

  CREATE_USER__SUCCESS,
  CREATE_USER__FAILURE,

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
} from '../Actions'
import { initialNewUserState } from '../stubs/initialNewUserState'
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
      const newUserDB = yield call(() => db.newUserDB.get(0, newUserDB => newUserDB))
      yield put({
        type: CONTINUE_USER__CONTINUE,
        payload: newUserDB,
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
    yield put(push('/profile'))
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
      yield put(push('/contacts'))
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
      yield put(push('/profile'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_CONTACTS__FORWARD
      yield put(push('/capabilities'))
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
    yield put(push('/contacts'))
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
  const newUserDB = yield select(state => state.newUser)
  delete initialNewUserState.isQuestion
  delete newUserDB.id
  try {
    yield put(push('/users'))
    db.usersDB.add({
      ...newUserDB,
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
    yield put({
      type: FORWARD_CAPABILITIES__ADD_NEW_USER,
      payload: {
        newUser: initialNewUserState,
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

export function* fetchUsersDBSaga() {
  try {
    const users = yield call(() => db.usersDB.toArray(users => users))
    yield put({
      type: FETCH_USERS__SUCCESS,
      payload: {
        users,
      },
    })
  } catch (error) {
    yield put({
      type: FETCH_USERS__FAILURE,
      error,
    })
  }
}

export function* deleteUserSaga(action) {
  const {
    id, currentPage, total, per_page,
  } = action.payload
  try {
    db.usersDB.delete(id)
    const isPagesCountChange = Math.ceil(total / per_page) !== Math.ceil((total - 1) / per_page)
    const page = isPagesCountChange ? currentPage - 1 : currentPage
    if (isPagesCountChange) {
      yield put(push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` }))
    }
    const users = yield call((page, per_page) => {
      const start = (page - 1) * per_page
      return db.usersDB.toArray(usersDB => usersDB.slice(start, start + per_page))
    }, page, per_page)
    yield put({
      type: DELETE_USER__SUCCESS,
      payload: {
        users,
        total: total - 1,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_USER__FAILURE,
      error,
    })
  }
}


export function* searchingUsersSaga(action) {
  const { filterUsers } = action.payload
  try {
    yield put({
      type: SEARCHING_USERS__SUCCESS,
      payload: {
        filterUsers,
      },
    })
  } catch (error) {
    yield put({
      type: SEARCHING_USERS__FAILURE,
      error,
    })
  }
}


export function* createUserSaga() {
  try {
    yield put({
      type: CREATE_USER__SUCCESS,
      payload: initialNewUserState,
    })
  } catch (error) {
    yield put({
      type: CREATE_USER__FAILURE,
      error,
    })
  }
}

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
  const { deleteAddField, id } = action.payload
  const phoneArray = yield select(state => state.editUserReducer.editUser.phoneArray)
  let type
  try {
    if (deleteAddField === 'add') {
      phoneArray.push('')
      type = DELETE_FIELD_PHONE_EDITING__ADD
    } else {
      phoneArray.pop('')
      type = DELETE_FIELD_PHONE_EDITING__DELETE
    }
    db.usersDB.update(id, {
      phoneArray,
    })
    yield put({
      type,
      payload: {
        phoneArray,
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
