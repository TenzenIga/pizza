import React from 'react'
import { IProduct, ICart } from '../interface/interface';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import { Card, Button, Row, Col } from 'react-bootstrap';


type propsProductList = {
    products:IProduct[],
    cart:ICart[],
    addToCart:Function,
    increment:Function
}

 function ProductList(props:propsProductList) {
    const {products, cart,addToCart, increment} = props

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
    const list = products.map((p:IProduct)=>{
        return(
            <Col className='mt-4' key={p.id} sm={12} md={6} lg={4}>
            <Card className='bg-light' >
            <Link to={`/products/${p.id}`} >
            <Card.Img variant='top' src={'/img/' + p.img} >
            </Card.Img>
            </Link>
            <Card.Body className='text-right'>
             <div className='d-flex justify-content-between align-items-baseline'>
             <Card.Title>{p.name}</Card.Title>
            <Card.Subtitle className='text-muted'>{p.price}$</Card.Subtitle>
            </div>   
            <Button  variant="outline-primary" onClick = {()=> {handleClick(p)}} >Order</Button>
            </Card.Body> 
        </Card>
        </Col>
        )
    }) 
    return (
        <Row className='mb-4'>
            <Loading />
           <Error />
            {list}
        </Row>
    )
}



export default ProductList;