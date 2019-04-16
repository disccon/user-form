import { listUsers } from '../stubs/listUsers'
import {
  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

} from '../Actions'

export default function listUsersReducer(state = listUsers, action) {
  switch(action.type) {
    // case SAVE_USER_SRC_AVATAR_IMG__SUCCESS: {
    //   return {
    //     ...state,
    //     userSRCAvatarIMG: action.payload.userSRCAvatarIMG,
    //     error: undefined,
    //   }
    // }




    default:
      return state
  }
}
