import  productsReducer  from "./products/reducers";
import { combineReducers } from "redux";
import cartReducer from "./cart/reducers";
import userReducer from "./user/reducers";
import exchangeReducer from './Currency/reducers';

export default combineReducers({
    products:productsReducer,
    cart:cartReducer,
    user:userReducer,
    exchange:exchangeReducer
})
