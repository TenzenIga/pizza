import { IProduct, ICart } from "../../interface/interface";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const CLEAR = 'CLEAR';


export const addToCart = (product:IProduct)=>{
    return {
        type:ADD_TO_CART,
        payload:product
    }
}

export const increment = (cart:ICart[]) =>{
    return {
        type:INCREMENT,
        payload:cart
    }
}

export const decrement = (cart:ICart[]) =>{
    return {
        type:DECREMENT,
        payload:cart
    }
}

export const deleteFromCart = (cart:ICart[]) =>{
    return {
        type:REMOVE_FROM_CART,
        payload:cart
    }
}