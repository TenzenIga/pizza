import React from 'react'
import CartItem from './CartItem';
import { ICart, IUser, IStore } from '../interface/interface';
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement, deleteFromCart } from '../store/cart/actions';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';





type CartProps = {
    cart:ICart[],
    increment:Function,
    decrement:Function,
    deleteFromCart:Function,
    user:IUser
}

 function Cart(props:CartProps) {
    const {cart, user, decrement, increment, deleteFromCart} = props
    
    let totalSum = cart.length && cart.reduce((acc:number,current:ICart)=> acc + (current.quantity * current.price), 0);
    
    const handleIncrement = (product:ICart) =>{
        const tempCart = [...cart];
        const index = tempCart.indexOf(product);
        const selectedProduct = tempCart[index];
        selectedProduct.quantity += 1;
        increment(tempCart)
    }

    const handleDecrement = (product:ICart) =>{
        let tempCart = [...cart];
        const index = tempCart.indexOf(product);
        const selectedProduct = tempCart[index];
        selectedProduct.quantity -= 1;
        if(selectedProduct.quantity === 0){
            handleDeleteFromCart(selectedProduct);
        }else{
            decrement(tempCart)
        }       
    }
    
    const handleDeleteFromCart = (product:ICart) =>{
        let newCart = cart.filter((item:ICart)=> product.id !== item.id)
        deleteFromCart(newCart)
    }

    const addOrder = () =>{
        const products = cart.map((order:ICart)=> {return {product_id:order.id,quantity: order.quantity, sum:order.price * order.quantity }})
        axios.post('/orders', {products}, {headers: {'x-auth-token': user.token}})
        .then((response) => {
            console.log(response.status);
            
        }, (error) => {
           console.log(error);
           
        });  
    }
    
    const cartItemsList = cart.map((item:ICart)=>
     <CartItem 
        key={item.id}
        item={item}
        decrement={handleDecrement}
        increment={handleIncrement}
        deleteFromCart={handleDeleteFromCart}
         /> 
    ) 
 
    return (
        <div className='cart'>
            <h3 className='text-center'>Cart</h3>
            { cart.length ? (
                <>
                {cartItemsList}
                <div className='border-top border-primary'>
                <h5 className='mt-2'>Order sum: {totalSum} $</h5>
                <h5>Total price: {totalSum} $</h5>
                <OverlayTrigger
                        key='right'
                        placement='right'
                        overlay={
                        <Tooltip id='tooltip'>
                            Login to save order!
                        </Tooltip>
                }>
                    <Button className='mt-2 cart-buy' onClick={() => addOrder()} variant='secondary'>Buy</Button>
                </OverlayTrigger>
                </div>
             
                </>
                ) : (
                    <h5 className='text-center'>Cart is empty</h5>
                )}
        </div>
    )
}

const mapStateToProps = (state:IStore) =>({
    cart:state.cart,
    user:state.user
});

const mapDispatchToProps = (dispatch:Dispatch) => {
    return{
        decrement:bindActionCreators(decrement, dispatch),
        increment:bindActionCreators(increment, dispatch),
        deleteFromCart:bindActionCreators(deleteFromCart, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)