import {
  put, select, call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  CREATE_USER__SUCCESS,
  CREATE_USER__FAILURE,

  CHANGE_QUESTION_STATE__OPEN,
  CHANGE_QUESTION_STATE__CLOSE,
  CHANGE_QUESTION_STATE__FAILURE,

  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT__SUCCESS,
  CHANGE_AVATAR_ACCOUNT__FAILURE,

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
} from '../actions/actionNewUser'
import { initialNewUserState } from '../stubs/initialNewUserState'
import db from '../db'

export function* createUserSaga() {
  try {
    db.newUserDB.update(0, {
      ...initialNewUserState,
    })
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
      const newUser = yield call(() => db.newUserDB.get(0))
      if (newUser.contactsFilled) {
        yield put(push('/capabilities'))
      } else if (newUser.profileFilled) {
        yield put(push('/contacts'))
      } else if (newUser.accountFilled) {
        yield put(push('/profile'))
      }
      yield put({
        type: CONTINUE_USER__CONTINUE,
        payload: newUser,
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

export function* changeAvatarAccountSaga(action) {
  const { userSRCAvatarIMG } = action.payload
  try {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT__SUCCESS,
      payload: {
        userSRCAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT__FAILURE,
      error,
    })
  }
}

export function* forwardAccountSaga(action) {
  const {
    userName, password, userSRCAvatarIMG,
  } = action.payload
  try {
    const accountFilled = true
    db.newUserDB.update(0, {
      userName, password, repeatPassword: password, userSRCAvatarIMG, accountFilled,
    })
    yield put(push('/profile'))
    yield put({
      type: FORWARD_ACCOUNT__SUCCESS,
      payload: {
        userName, password, repeatPassword: password, userSRCAvatarIMG, accountFilled,
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
    const profileFilled = true
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_PROFILE__BACK
      yield put(push('/'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_PROFILE__FORWARD
      yield put(push('/contacts'))
      db.newUserDB.update(0, {
        firstName, lastName, birthDate, email, address, gender, profileFilled,
      })
    }
    yield put({
      type: actionType,
      payload: {
        firstName, lastName, birthDate, email, address, gender, profileFilled,
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
    const contactsFilled = true
    let actionType
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_CONTACTS__BACK
      yield put(push('/profile'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_CONTACTS__FORWARD
      yield put(push('/capabilities'))
      db.newUserDB.update(0, {
        company,
        githubLink,
        facebookLink,
        selectLanguage,
        fax,
        phoneArray,
        phoneN1,
        phoneN2,
        phoneN3,
        contactsFilled,
      })
    }
    yield put({
      type: actionType,
      payload: {
        company,
        githubLink,
        facebookLink,
        selectLanguage,
        fax,
        phoneArray,
        phoneN1,
        phoneN2,
        phoneN3,
        contactsFilled,
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
      type = DELETE_ADD_FIELD_PHONE__ADD
    } else if (deleteAddField === 'delete' && phoneArray.length > 1) {
      phoneN2 = phoneArray.length === 2 ? null : phoneN2
      phoneN3 = null
      newPhoneArray.pop('')
      type = DELETE_ADD_FIELD_PHONE__DELETE
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
  db.newUserDB.update(0, {
    ...initialNewUserState,
  })
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
    checkboxFemale, checkboxGuitar, checkboxWtf,
  } = action.payload
  try {
    const newUser = yield select(state => state.newUser)
    delete initialNewUserState.isQuestion
    delete newUser.id
    delete newUser.accountFilled
    delete newUser.profileFilled
    delete newUser.contactsFilled
    yield put(push('/users'))
    db.usersDB.add({
      ...newUser,
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
