import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import initialState from './userSaveReducer'
//import { reducer as formReducer } from 'redux-form';
import { reducer as reduxFormReducer } from 'redux-form'


export default history => combineReducers({
  router: connectRouter(history),
  initialState,
  form: reduxFormReducer,
})
