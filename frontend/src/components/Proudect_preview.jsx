import React, { useState, useEffect } from "react";
import { ProductPreviewCard } from './ProductPreviewCard'
import Carousel from 'react-multi-carousel';
import { cartProducts } from "../store/cart/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



import 'react-multi-carousel/lib/styles.css';


import { addToCart } from "../store/cart/cartSlice";


export const ProductsPreview = () => {
  const cart = useSelector(cartProducts);

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    let content;

   

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
   
    useEffect(() => {
       fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => {setProducts(data?.data)})
            .catch(e => console.log(e))
    }, [])
  
    const onAddProduct = (product) => {
     

      dispatch(addToCart(product))

       
     
  }
  

  
   
    return (<>
    
      
        <div className="container mx-auto mt-10 pb-4 w-[80rem]  rounded-md text-white bg-[#1f1d2b]">
            <Carousel responsive={responsive} >
            
            {
                products.length > 0 && products.map((product, index) => {
                    return (
                        <div className="w-full p-3 ">
                            <ProductPreviewCard key={product._id} product={product} onAddProduct={onAddProduct} content={content} />
                        </div>
                    )
                })
            }
            </Carousel>
        </div>
        </>
    )
}