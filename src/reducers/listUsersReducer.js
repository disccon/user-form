import {
  USER_LISTER_NEW_STATE__SUCCESS,
  USER_LISTER_NEW_STATE__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

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
import { initialListUsers } from '../stubs/initialListUsers'


export default function listUsersReducer(state = initialListUsers, action) {
  switch (action.type) {
    case USER_LISTER_NEW_STATE__SUCCESS: {
      return {
        ...state,
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

    case SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS: {
      return {
        ...state,
        users: action.payload.newListUsers,
        error: undefined,
      }
    }
    case SAVE_AVATAR_ACCOUNT_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case ACCOUNT_EDITING_SAVE__SUCCESS: {
      return {
        ...state,
        users: action.payload.newListUsers,
        error: undefined,
      }
    }
    case ACCOUNT_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case PROFILE_EDITING_SAVE__SUCCESS: {
      return {
        ...state,
        users: action.payload.newListUsers,
        error: undefined,
      }
    }
    case PROFILE_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CONTACTS_EDITING_SAVE__SUCCESS: {
      return {
        ...state,
        users: action.payload.newListUsers,
        error: undefined,
      }
    }
    case CONTACTS_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CAPABILITIES_EDITING_SAVE__SUCCESS: {
      return {
        ...state,
        users: action.payload.newListUsers,
        error: undefined,
      }
    }
    case CAPABILITIES_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    default:
      return state
  }
}
