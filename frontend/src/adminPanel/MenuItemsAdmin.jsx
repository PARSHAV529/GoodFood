import React, { useEffect, useRef, useState } from 'react'
import AdminHome from './AdminHome'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from '../store/menu/productsSlice';
import { ProductPreviewCardAdmin } from './ProductPreviewCardAdmin';
import AddItem from './AdditemForm'

export const MenuItemsAdmin = () => {
  const dispatch = useDispatch();
  const openForm = useRef();
  const [form,setForm]=useState("")

  function handleForm() {
    openForm.current.open()
    
  }

  const products = useSelector(selectAllProducts);
  useEffect(() => {
    dispatch(fetchProducts())
    setForm("finished")
  }, [form])
  return (
    <>
      <AdminHome tab='MenuItems' />

      
      <div className=''>
      <AddItem ref={openForm} onclick={setForm} />


      </div>
    

      <div className="flex flex-row mx-3 items-center justify-center flex-wrap">
        <ProductPreviewCardAdmin onclick={handleForm} />
        {products.products && products.products.map((categoryProducts, categoryIndex) => (
          categoryProducts.products.map((product, productIndex) => (
            <ProductPreviewCardAdmin key={productIndex} product={product} />
          ))
        ))}

      </div>


    </>)
}
