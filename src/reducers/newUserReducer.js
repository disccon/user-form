import newUser from '../stubs/newUser'
import {
  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  SAVE_BIRTH_DATE__SUCCESS,
  SAVE_BIRTH_DATE__FAILURE,

  SAVE_GENDER_INPUT__SUCCESS,
  SAVE_GENDER_INPUT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,
} from '../Actions'

export default function newUserReducer(state = newUser, action) {
  switch(action.type) {
    case SAVE_USER_SRC_AVATAR_IMG__SUCCESS: {
      return {
        ...state,
        userSRCAvatarIMG: action.payload.userSRCAvatarIMG,
        error: undefined,
      }
    }
    case SAVE_USER_SRC_AVATAR_IMG__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case FORWARD_ACCOUNT__SUCCESS: {
      return {
        ...state,
        userName: action.payload.userName,
        password: action.payload.userName,
        repeatPassword: action.payload.repeatPassword,
        error: undefined,
      }
    }
    case FORWARD_ACCOUNT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_BIRTH_DATE__SUCCESS: {
      return {
        ...state,
        birthDate: action.payload.birthDate,
        error: undefined,
      }
    }
    case SAVE_BIRTH_DATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case SAVE_GENDER_INPUT__SUCCESS: {
      return {
        ...state,
        gender: action.payload.gender,
        error: undefined,
      }
    }
    case SAVE_GENDER_INPUT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case FORWARD_BACK_PROFILE__BACK: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        address: action.payload.address,
        error: undefined,
      }
    }
    case FORWARD_BACK_PROFILE__FORWARD: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        address: action.payload.address,
        error: undefined,
      }
    }
    case FORWARD_BACK_PROFILE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }



    default:
      return state
  }
}
