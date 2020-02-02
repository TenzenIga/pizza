"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function CartItem(props) {
    var item = props.item, decrement = props.decrement, increment = props.increment, deleteFromCart = props.deleteFromCart;
    return (<div className='cart-item'>
                <div className='cart-item__name'>{item.name}</div>
                <div className='cart-item__number'>
                    <button className='btn-decr' onClick={function () { return decrement(item); }}>-</button>
                    <span>{item.quantity}</span>
                    <button className='btn-incr' onClick={function () { return increment(item); }}>+</button>
                </div>
                <div className='cart-item__price'>{item.price * item.quantity}€</div>
                <button className='cart-item__delete' onClick={function () { return deleteFromCart(item); }}>x</button>
                
            </div>);
}
exports.default = CartItem;
