import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import ParcelReducers from './ParcelReducers'
import TransaksiListReducers from './TransaksiListReducers'

export default combineReducers({
    Auth    : AuthReducers,
    Parcel  : ParcelReducers,
    TransaksiList : TransaksiListReducers
});