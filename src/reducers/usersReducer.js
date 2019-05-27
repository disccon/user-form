import {
  FETCH_USERS__LOADING,
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__LOADING,
  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,
} from '../actions/actionUsers'
import { initialUsersState } from '../stubs/initialUsersState'

export default function usersReducer(state = initialUsersState, action) {
  switch (action.type) {
    case FETCH_USERS__LOADING: {
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        isLoading: action.payload.isLoading,
      }
    }
    case FETCH_USERS__SUCCESS: {
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

    default:
      return state
  }
}
