import { ICart, IAction } from "../../interface/interface";
import { ADD_TO_CART, INCREMENT, DECREMENT, REMOVE_FROM_CART } from "./actions";

const initialState:ICart[] = []




export default function cartReducer(state=initialState, action:IAction){
        switch (action.type) {
            case ADD_TO_CART:
                return [...state, action.payload]
            case INCREMENT:
                return [...action.payload]
            case DECREMENT:
                return [...action.payload]
            case REMOVE_FROM_CART:
                return [...action.payload]
            default:
                return state;
        }
}