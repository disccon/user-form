import initialState from '../stubs/initialState'
import {
  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  SAVE_BIRTH_DATE__SUCCESS,
  SAVE_BIRTH_DATE__FAILURE,

  SAVE_GENDER_INPUT__SUCCESS,
  SAVE_GENDER_INPUT__FAILURE,
} from '../Actions'

export default function userSaveReducer(state = initialState, action) {
  switch(action.type) {
    case FORWARD_ACCOUNT__SUCCESS: {
      return {
        ...state,
        newUser: {
          userName: action.payload.userName,
          password: action.payload.userName,
          repeatPassword: action.payload.repeatPassword,
          userAvatarIMGUrl: action.payload.userAvatarIMGUrl,
        },
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
        newUser: {
          birthDate: action.payload.birthDate,
        },
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
        newUser: {
          gender: action.payload.gender,
        },
        error: undefined,
      }
    }
    case SAVE_GENDER_INPUT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }



    default:
      return state
  }
}
