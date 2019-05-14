import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as reduxFormReducer } from 'redux-form'
import newUser from './newUserReducer'
import listUsers from './listUsersReducer'
import editUserState from './editUserReducer'


export default history => combineReducers({
  router: connectRouter(history),
  newUser,
  listUsers,
  editUserState,
  form: reduxFormReducer,
})
