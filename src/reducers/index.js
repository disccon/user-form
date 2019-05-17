import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as reduxFormReducer } from 'redux-form'
import newUser from './newUserReducer'
import usersReducer from './usersReducer'
import editUserReducer from './editUserReducer'


export default history => combineReducers({
  router: connectRouter(history),
  newUser,
  usersReducer,
  editUserReducer,
  form: reduxFormReducer,
})
