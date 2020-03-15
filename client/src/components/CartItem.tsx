import React from 'react'
import { ICart } from '../interface/interface'
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
type props = {
    item:ICart
    decrement:(product:ICart)=>void
    increment:(product:ICart)=>void
    deleteFromCart:(product:ICart)=>void
}

export default function CartItem(props:props) {
    const {item, decrement, increment, deleteFromCart} = props;
    return (
                <div className='my-4 d-flex justify-content-between align-items-center'>
                <div className='w-25 h5'>{item.name}</div>
                <div className='w-25 align-items-baseline d-sm-flex'>
                    <Button className='cart-button' size="sm" onClick={()=>decrement(item)} >
                    <FontAwesomeIcon   icon={faMinus} />
                    </Button>
                    <div className='cart-price text-center p-2' >{item.quantity}</div>
                    <Button className='cart-button' size="sm" onClick={()=>increment(item)} >
                    <FontAwesomeIcon  icon={faPlus} />
                    </Button>
                </div>
                <div className='h5'>{item.price * item.quantity}$ </div>
                <Button variant='danger' onClick={()=>deleteFromCart(item)} size="sm">
                <FontAwesomeIcon  icon={faTimes} />
                </Button>
               
            </div>
        
    )
}
