import { combineReducers } from "redux";

import user from './user'
import auth from './auth'
import otp from './otp'
import rightOtp from './rightOtp'
import complain from './complain'
import reload from './reload'
export default combineReducers({
    user,auth,otp,rightOtp,complain,reload
});