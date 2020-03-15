import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct, ICart, IStore } from '../interface/interface';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Dispatch, bindActionCreators } from 'redux';
import { addToCart, increment } from '../store/cart/actions';
import { connect } from 'react-redux';


type ProductPageProps = {
    cart:ICart[],
    addToCart:Function,
    increment:Function
}


function ProductPage(props:ProductPageProps){
    const [product, setProduct] = useState<IProduct| null>();
    const {cart,addToCart, increment} = props;

    const handleClick = (product:IProduct) =>{
        let tempCart = [...cart];
        const inCart = tempCart.find(item => item.id === product.id);
        if(inCart){
            let selectedProduct = {...inCart}
            const index = tempCart.indexOf(inCart);
            selectedProduct = tempCart[index];
            selectedProduct.quantity += 1;
            increment([...tempCart])
        }else{
            addToCart( {...product,quantity: 1})
        }
    }
    const { id } = useParams();
    
    
    const fetchProduct = async (url:string) => {
        try {
          const res = await fetch(url)
          const  data  = await res.json()
          if(!data.length) return;  
          setProduct(data[0])
        } catch (e) {
          if (e) {
            console.log(e)
          }
        }
      }

    useEffect(() => {
        fetchProduct(`/products/${id}`)
    }, [])

    return (
        <div className='text-center'>
    {   
    product ? (
    <Card  className='mx-auto my-3 bg-light product-page__card' >
    <Card.Img variant='top' src={`/img/${product.img}`} />
    <Card.Body className='product-detail__footer'>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className='text-left'>{product.description}</Card.Text>
        <div className='d-flex justify-content-between align-items-baseline'>
        <Card.Title>{product.price}$</Card.Title>
        <Button variant='primary' onClick={()=>handleClick(product)}>Order</Button>
        </div>
    </Card.Body>
    
    </Card>
    )
    :
    <Spinner className='mt-4' animation="border" variant="primary" />
        
}
</div>
    )
}


const mapStateToProps = (state:IStore) =>({
  cart:state.cart
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return{
      addToCart:bindActionCreators(addToCart, dispatch),
      increment:bindActionCreators(increment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
