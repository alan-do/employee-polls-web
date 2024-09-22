import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import questionReducer from './questionReducer';
const rootReducer = combineReducers({
    authenticatedUser: authReducer,
    users: userReducer,
    questions: questionReducer,
});
export default rootReducer;