import { LOAD_PRODUCTS, setProducts, fetchingError } from "../products/actions";
import {takeEvery, put, call, all, fork} from 'redux-saga/effects'
import axios from 'axios';
import { LOAD_USER, loginSuccess, loginError, } from "../user/actions";
import { userInput, IAction } from "../../interface/interface";

 // Products saga
const fetchProducts = () => {
        return axios.get('/products')
  }

  function* workLoadProducts(){
    try {
      const res = yield call(fetchProducts)
      yield put(setProducts(res.data))
    } catch (error) {
      yield put(fetchingError(error.response.data))
    }
     
  }

 export function* watchLoadProducts(){
      yield takeEvery(LOAD_PRODUCTS, workLoadProducts)
  } 


// Auth saga 
  const authRequest = (data:userInput) => {
     return axios.post('/auth', { email:data.email, password:data.password})
  }

  function* workLoadUser(data:IAction){
      try {
        const res = yield call(authRequest, data.payload)
        if(res){
            console.log(res.data);
            
            yield put(loginSuccess({token:res.data.token, user:res.data.user})) 
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('uid', res.data.user.uid)
            localStorage.setItem('username', res.data.user.username)
        }
      } catch (error) {
         yield put(loginError(error.response.data)) 
      }
    }


 export function* watchLoadUser(){ 
      yield takeEvery(LOAD_USER, workLoadUser)
  } 


// root saga
  export function* rootSaga(){
      yield all(
          [fork(watchLoadProducts),
            fork(watchLoadUser)]
      )
  }