import React, { useContext } from 'react'
import { CartContext } from '../context/cartContext';
import CartItem from './CartItem';
import { ICart, IUser } from '../interface/interface';
import axios from 'axios';
import { UserContext } from '../context/userContext';

//mock function for converting currency
function converToDollar(num:number){
    return (num * 1.11).toFixed(2);
}


const saveOrders = (cart:ICart[], user:IUser)=>{
    const body = JSON.stringify(cart);
    axios.post('/orders', {body},  {headers: {'x-auth-token': user.token}})
    .then(response => {
        console.log(response.data);
        alert('Orders saved!')
    }, (error) => {
       console.log(error);
       
 });

 
}

export default function Cart() {
    const {cart, decrement, increment, deleteFromCart} = useContext(CartContext)
    const {user} = useContext(UserContext)
    
    const deliveryCost = 20;
    
    let totalSum = cart.length && cart.reduce((acc:number,current:ICart)=> acc + (current.quantity * current.price), 0);
    const cartItemsList = cart.map((item:ICart)=> <CartItem key={item.id} item={item} decrement={decrement} increment={increment} deleteFromCart={deleteFromCart} />) 
 

    return (
        <div className='cart'>
            <h3>Cart</h3>
            { cart.length ? (
                <>
                {cartItemsList}
            
                <h5>Order sum: {totalSum} €</h5>
                <h5>Delivery cost : {deliveryCost} €</h5>
                <h5>Total price with delivery: {totalSum + deliveryCost} €</h5>
                <h5>Total price in USA Dollar: {converToDollar(totalSum + deliveryCost)} $</h5>
                <button onClick={()=>saveOrders(cart, user)}>Buy</button>
                </>
                ) : (
                    <h5 className='cart-empty'>Cart is empty</h5>
                )}
        </div>
    )
}
