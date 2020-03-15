import { userInput } from "../../interface/interface";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT ="LOGOUT";
export const LOAD_USER = 'LOAD_USER'


export const loginSuccess = (res:any) =>{
    return {
        type:LOGIN_SUCCESS,
        payload:res
    }
}

export const loginError = (data:string) =>{
    return {
        type:LOGIN_ERROR,
        payload:data
    }
}

export const logOut = ()=>{
    return {
        type:LOGOUT
    }
}





export const loadUser = (data:userInput) =>{
    return{
        type:LOAD_USER,
        payload:data
    }
}