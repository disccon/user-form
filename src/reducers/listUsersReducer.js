import {
  USER_LISTER_NEW_STATE__SUCCESS,
  USER_LISTER_NEW_STATE__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__EDIT_USER,
  FORWARD_CAPABILITIES__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,
} from '../Actions'
import { ACCOUNT_EDITING_SAVE__SUCCESS } from '../Actions'
import { ACCOUNT_EDITING_SAVE__FAILURE } from '../Actions'

export default function listUsersReducer(state = { users: [] }, action) {
  switch (action.type) {
    case USER_LISTER_NEW_STATE__SUCCESS: {
      return {
        users: [...action.payload.userLister],
        error: undefined,
      }
    }
    case USER_LISTER_NEW_STATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case FORWARD_CAPABILITIES__ADD_NEW_USER: {
      return {
        ...state,
        users: [...state.users,
          action.payload],
        error: undefined,
      }
    }
    case FORWARD_CAPABILITIES__EDIT_USER: {
      return {
        ...state,
        users: action.payload.newObj,
        error: undefined,
      }
    }
    case FORWARD_CAPABILITIES__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case DELETE_USER__SUCCESS: {
      return {
        ...state,
        users: action.payload,
        error: undefined,
      }
    }
    case DELETE_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case ACCOUNT_EDITING_SAVE__SUCCESS: {
      return {
        ...state,
        users: action.payload,
        error: undefined,
      }
    }
    case ACCOUNT_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    default:
      return state
  }
}
