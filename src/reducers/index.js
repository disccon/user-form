import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import initialState from './taskReducer'
import { reducer as formReducer } from 'redux-form';

export default history => combineReducers({
  router: connectRouter(history),
  initialState,
  form: formReducer,
})
