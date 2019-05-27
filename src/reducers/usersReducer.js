import {
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SEARCHING_USERS__SUCCESS,
  SEARCHING_USERS__FAILURE,

  LOADING_INTERVAL__SUCCESS,
  LOADING_INTERVAL__FAILURE,
} from '../actions/actionUsers'
import { initialUsersState } from '../stubs/initialUsersState'

export default function usersReducer(state = initialUsersState, action) {
  switch (action.type) {
    case FETCH_USERS__SUCCESS: {
      return {
        ...state,
        users: [...action.payload.users],
        isLoading: action.payload.isLoading,
        error: undefined,
      }
    }
    case FETCH_USERS__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case DELETE_USER__SUCCESS: {
      return {
        ...state,
        users: [...action.payload.users],
        isLoading: action.payload.isLoading,
        error: undefined,
      }
    }
    case DELETE_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SEARCHING_USERS__SUCCESS: {
      return {
        ...state,
        filterUsers: action.payload.filterUsers,
        isLoading: action.payload.isLoading,
        error: undefined,
      }
    }
    case SEARCHING_USERS__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case LOADING_INTERVAL__SUCCESS: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: undefined,
      }
    }
    case LOADING_INTERVAL__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    default:
      return state
  }
}
