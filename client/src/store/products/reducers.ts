import { SET_PRODUCTS, LOAD_PRODUCTS, FETCH_PRODUCTS_FAIL } from "./actions";
import {IAction, ProductsState } from "../../interface/interface";



const initialState:ProductsState = {
    products:[],
    loading:false,
    error:null
}




export default function productsReducer(state=initialState, action:IAction ){
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...state, loading:true, error:null}
        case SET_PRODUCTS:
            return {...state, loading:false, products:action.payload}
        case FETCH_PRODUCTS_FAIL:
            return {...state, loading:false, products:[], error:action.payload}
        default:
            return state
    }
}