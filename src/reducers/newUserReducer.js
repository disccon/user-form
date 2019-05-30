import { initialNewUserState } from '../stubs/initialNewUserState'
import {
  SAVE_NEW_USER_DATA__SUCCESS,
  SAVE_NEW_USER_DATA__FAILURE,

  CHANGE_QUESTION_STATE__OPEN,
  CHANGE_QUESTION_STATE__CLOSE,
  CHANGE_QUESTION_STATE__FAILURE,

  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT__SUCCESS,
  CHANGE_AVATAR_ACCOUNT__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__FAILURE,

  CREATE_USER__SUCCESS,
  CREATE_USER__FAILURE,
} from '../actions/actionNewUser'

export default function newUserReducer(state = initialNewUserState, action) {
  switch (action.type) {
    case SAVE_NEW_USER_DATA__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case SAVE_NEW_USER_DATA__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CHANGE_QUESTION_STATE__CLOSE: {
      return {
        ...state,
        isQuestion: false,
        error: undefined,
      }
    }
    case CHANGE_QUESTION_STATE__OPEN: {
      return {
        ...state,
        isQuestion: action.payload.isQuestion,
        error: undefined,
      }
    }
    case CHANGE_QUESTION_STATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CONTINUE_USER__CONTINUE: {
      return {
        ...action.payload,
        isQuestion: false,
        error: undefined,
      }
    }
    case CONTINUE_USER__CLOSE: {
      return {
        ...state,
        isQuestion: action.payload.isQuestion,
        error: undefined,
      }
    }
    case CONTINUE_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CHANGE_AVATAR_ACCOUNT__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case CHANGE_AVATAR_ACCOUNT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case FORWARD_CAPABILITIES__ADD_NEW_USER: {
      return {
        ...action.payload,
        error: undefined,
      }
    }
    case FORWARD_CAPABILITIES__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CREATE_USER__SUCCESS: {
      return {
        ...action.payload,
        error: undefined,
      }
    }
    case CREATE_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
