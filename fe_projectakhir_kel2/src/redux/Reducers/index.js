import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import ParcelReducers from './ParcelReducers'

export default combineReducers({
    Auth    : AuthReducers,
    Parcel  : ParcelReducers
});