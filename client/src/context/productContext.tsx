import React, {createContext, useState, useEffect} from 'react';
import { IProduct } from '../interface/interface';




export const ProductContext = createContext<IProduct[] | any>([]);



export function ProductsProvider(props:JSX.ElementChildrenAttribute): JSX.Element{
    const [products, setProducts] = useState([]);

    const fetchProducts = async (url:string) => {
        try {
          const res = await fetch(url)
          const  products  = await res.json()
          setProducts(products)
    
        } catch (e) {
          if (e) {
            console.log(e)
          }
        }
      }

    useEffect(() => {
        fetchProducts('/products')
    }, [])
    
    return <ProductContext.Provider value={{products}}>
        {props.children}
    </ProductContext.Provider>
}