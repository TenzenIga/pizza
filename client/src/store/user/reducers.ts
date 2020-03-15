import { IAction, IUser } from "../../interface/interface";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./actions";


const initialState:IUser = {
    isLoggedIn:localStorage.getItem('token') ? true : false,
    username:localStorage.getItem('username'),
    uid:localStorage.getItem('uid'),
    isAdmin:false,
    error:null,
    token:localStorage.getItem('token')
}

export default function userReducer(state=initialState, action:IAction){
    switch (action.type){
        case LOGIN_SUCCESS:
                return {
                        username:action.payload.user.username,
                        uid:action.payload.user.uid,
                        isAdmin:action.payload.user.isAdmin,
                        isLoggedIn:true,
                        token:action.payload.token
                        }
        case LOGIN_ERROR:
            return { token: null, isLoggedIn:false, error:action.payload, uid:null, username:null, isAdmin:false }
        case LOGOUT:
            return { token: null, isLoggedIn:false, error:null, uid:null, username:null, isAdmin:false }
        default:
            return state;
        }
}