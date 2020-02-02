import React from 'react'
import { ICart } from '../interface/interface'
type props = {
    item:ICart
    decrement:(product:ICart)=>void
    increment:(product:ICart)=>void
    deleteFromCart:(product:ICart)=>void
}

export default function CartItem(props:props) {
    const {item, decrement, increment, deleteFromCart} = props;
    return (
                <div className='cart-item'>
                <div className='cart-item__name'>{item.name}</div>
                <div className='cart-item__number'>
                    <button className='btn-decr' onClick={()=>decrement(item)} >-</button>
                    <span>{item.quantity}</span>
                    <button className='btn-incr' onClick={()=>increment(item)} >+</button>
                </div>
                <div className='cart-item__price'>{item.price * item.quantity}€</div>
                <button className='cart-item__delete' onClick={()=>deleteFromCart(item)}>x</button>
                
            </div>
        
    )
}
