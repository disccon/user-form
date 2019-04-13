import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import newUser from './newUserReducer'
import listUsers from './listUsersReducer'
import { reducer as reduxFormReducer } from 'redux-form'



export default history => combineReducers({
  router: connectRouter(history),
  newUser,
  listUsers,
  form: reduxFormReducer,
})
