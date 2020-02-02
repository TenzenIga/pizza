import React, { useContext } from 'react'
import { ProductContext } from '../context/productContext'
import { IProduct } from '../interface/interface';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

export default function ProductList() {
    const {products} = useContext(ProductContext);
    const {addToCart} = useContext(CartContext) 
    const list = products.map((p:IProduct)=>{
        return(
            <div  key={p.id} className='product'>
            <Link to={`/products/${p.id}`} ><img src={'/img/' + p.img} className='product__img' alt=""/></Link>
            <div className='product__info'> 
            <h3 className='product__name'>{p.name}</h3>
            <h4 className='product__price'>{p.price} €</h4>
            <button className='product__btn' onClick={()=>addToCart(p)} >Order</button>
            </div>
        </div>
        )
    }) 
    return (
        <div className='product-list'>
            {list}
        </div>
    )
}
