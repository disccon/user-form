import { listUsers } from '../stubs/listUsers'
import {
  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__EDIT_USER,
} from '../Actions'

export default function listUsersReducer(state = listUsers, action) {
  switch(action.type) {
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



    default:
      return state
  }
}
