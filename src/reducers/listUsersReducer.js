import { listUsers } from '../stubs/listUsers'
import {
  FORWARD_BACK_CAPABILITIES__FORWARD,

} from '../Actions'

export default function listUsersReducer(state = listUsers, action) {
  switch(action.type) {
    case FORWARD_BACK_CAPABILITIES__FORWARD: {
      return {
        ...state,
        users: [...state.users,
        action.payload],
        error: undefined,
      }
    }




    default:
      return state
  }
}
