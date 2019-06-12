import {
  FETCH_USERS__LOADING,
  FETCH_USERS__SUCCESS,
  FETCH_USERS__NOHAVE_USERS,
  FETCH_USERS__FAILURE,

  DELETE_USER__LOADING,
  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SWAP_USERS__SUCCESS,
  SWAP_USERS__FAILURE,

  SHOW_BUTTON_FILTER__SUCCESS,
  SHOW_BUTTON_FILTER__FAILURE,

  APPLY_FILTER_FILTER_USERS__SUCCESS,
  APPLY_FILTER_FILTER_USERS__FAILURE,

} from '../actions/actionUsers'
import { initialUsersState } from '../stubs/initialUsersState'

export default function usersReducer(state = initialUsersState, action) {
  switch (action.type) {
    case FETCH_USERS__LOADING: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case FETCH_USERS__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case FETCH_USERS__NOHAVE_USERS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case FETCH_USERS__FAILURE: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.error,
      }
    }

    case DELETE_USER__LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    }
    case DELETE_USER__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case DELETE_USER__FAILURE: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.error,
      }
    }

    case SWAP_USERS__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case SWAP_USERS__FAILURE: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.error,
      }
    }

    case SHOW_BUTTON_FILTER__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case SHOW_BUTTON_FILTER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case APPLY_FILTER_FILTER_USERS__SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    }
    case APPLY_FILTER_FILTER_USERS__FAILURE: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.error,
      }
    }

    default:
      return state
  }
}
