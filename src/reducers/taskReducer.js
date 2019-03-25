import initialState from '../stubs/initialState'
import {
  CHANGE_NAME_TEXT_FIELD__SUCCESS,
  CHANGE_NAME_TEXT_FIELD__FAILURE,
} from '../Component/Actions'

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME_TEXT_FIELD__SUCCESS: {
      return {
        ...state,
        textFieldName: action.payload.textFieldName,
        error: undefined,
      }
    }
    case CHANGE_NAME_TEXT_FIELD__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
