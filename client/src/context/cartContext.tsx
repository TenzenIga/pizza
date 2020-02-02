import React, {createContext, useState} from 'react';
import { IProduct, ICart } from '../interface/interface';





export const CartContext = createContext<ICart[] | any>([]);



export function CartProvider(props:JSX.ElementChildrenAttribute): JSX.Element{
    const [cart, setCart] = useState<ICart[]>([]);
    
    const addToCart = (product:IProduct)=>{
        let tempCart = [...cart];
        let selectedProduct:ICart = {...product,quantity: 1}
        const inCart = tempCart.find(item => item.id === product.id);
        if(inCart){
       increment(inCart)
        }else{
            setCart([...tempCart, selectedProduct])
        }
    }

    const increment = (product:ICart)=>{
        let tempCart = [...cart];
        let selectedProduct = {...product}
        const index = tempCart.indexOf(product);
        selectedProduct = tempCart[index];
        selectedProduct.quantity += 1;
        setCart([...tempCart])
    }

    const decrement = (product:ICart)=>{
        let tempCart = [...cart];
        let selectedProduct = {...product}
        const index = tempCart.indexOf(product);
        selectedProduct = tempCart[index];
        selectedProduct.quantity -= 1;
        if(selectedProduct.quantity === 0){
            deleteFromCart(selectedProduct);
        }else{
            setCart([...tempCart])
        }
    }

    const deleteFromCart = (product:ICart) =>{
        let newCart = cart.filter((item:ICart)=> product.id !== item.id)
        setCart([...newCart])
    }
    

    return <CartContext.Provider value={{cart, addToCart, decrement, increment, deleteFromCart}}>
        {props.children}
    </CartContext.Provider>
}