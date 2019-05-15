import {
  LISTER_USER_STATE__SUCCESS,
  LISTER_USER_STATE__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__FAILURE,

} from '../Actions'
import { initialListUsers } from '../stubs/initialListUsers'


export default function listUsersReducer(state = initialListUsers, action) {
  switch (action.type) {
    case LISTER_USER_STATE__SUCCESS: {
      return {
        ...state,
        users: [...action.payload.userLister],
        error: undefined,
      }
    }
    case LISTER_USER_STATE__FAILURE: {
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

    case FORWARD_CAPABILITIES__ADD_NEW_USER: {
      return {
        ...state,
        users: [...state.users,
          action.payload],
        error: undefined,
      }
    }
    case FORWARD_CAPABILITIES__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
