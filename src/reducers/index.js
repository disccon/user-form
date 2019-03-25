import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import initialState from './taskReducer'

export default history => combineReducers({
  router: connectRouter(history),
  initialState,
})
