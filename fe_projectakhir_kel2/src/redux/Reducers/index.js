import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import AdminReducers from './AdminReducers'

export default combineReducers({
    Auth: AuthReducers,
    Admin: AdminReducers
});