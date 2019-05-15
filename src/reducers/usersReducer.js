import {
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

} from '../Actions'
import { initialUsersState } from '../stubs/initialUsersState'


export default function usersReducer(state = initialUsersState, action) {
  switch (action.type) {
    case FETCH_USERS__SUCCESS: {
      return {
        ...state,
        users: [...action.payload.users],
        total: action.payload.total,
        error: undefined,
      }
    }
    case FETCH_USERS__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
