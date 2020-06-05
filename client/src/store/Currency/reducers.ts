
import { SET_EXCHANGE_RATE, FETCH_EXCHANGE_RATE_FAIL } from "./actions";
import {IAction, CurrencyState} from "../../interface/interface";



const initialState:CurrencyState = {
    exchangeRate:null, // 1 dollar to 1 euro rate from  https://openexchangerates.org/ API
    error:null
}




export default function productsReducer(state=initialState, action:IAction ){
    switch (action.type) {
        case SET_EXCHANGE_RATE:
            return {...state, exchangeRate:action.payload};
        case FETCH_EXCHANGE_RATE_FAIL:
            return {...state, error:action.payload};
        default:
            return state;
    }
}