import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { IProduct } from '../interface/interface';

export default function ProductPage() {
    const [product, setProduct] = useState<IProduct| null>()
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
        <>
    {   
    product &&
    <div className='product-detail' >
    <img src={`/img/${product.img}`} className='product-detail__img' alt="" />
    <div className='product-detail__footer'>
        <h2>{product.name}</h2>
        <h3>{product.price}$</h3>
        <button>Order</button>
    </div>
    
    </div>
    }
        </>
    
    )
}
