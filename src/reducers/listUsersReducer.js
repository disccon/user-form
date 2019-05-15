import {
  LISTER_USERS_STATE__SUCCESS,
  LISTER_USERS_STATE__FAILURE,

} from '../Actions'
import { initialListUsers } from '../stubs/initialListUsers'


export default function listUsersReducer(state = initialListUsers, action) {
  switch (action.type) {
    case LISTER_USERS_STATE__SUCCESS: {
      return {
        ...state,
        users: [...action.payload.users],
        usersLength: action.payload.usersLength,
        error: undefined,
      }
    }
    case LISTER_USERS_STATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
