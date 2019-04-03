import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import newUser from './newUserReducer'
//import { reducer as formReducer } from 'redux-form';
import { reducer as reduxFormReducer } from 'redux-form'


export default history => combineReducers({
  router: connectRouter(history),
  newUser,
  form: reduxFormReducer,
})
