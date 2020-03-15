import { IProduct } from "../../interface/interface";
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';


export const setProducts = (dataFromServer:IProduct[])=>{
    return{
        type: SET_PRODUCTS,
        payload: dataFromServer
    }
}

export const fetchingError = (error:string)=>{
    return{
        type:FETCH_PRODUCTS_FAIL,
        payload:error
    }
}
export const loadProducts = ()=>{
    return{
        type:LOAD_PRODUCTS
    }
}

