import React, { useEffect, useRef, useState } from 'react';
import AdminHome from './AdminHome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from '../store/menu/productsSlice';
import { ProductPreviewCardAdmin } from './ProductPreviewCardAdmin';
import AddItem from './AdditemForm';
import UpdateItem from './UpdateItemForm';
import { user } from '../store/userInfo/userSlice';

export const MenuItemsAdmin = () => {
  const dispatch = useDispatch();
  let userinfo = useSelector(user)
  
  let email = userinfo.email
    
  const openForm = useRef();
  const openupdateForm = useRef();
  const [form, setForm] = useState("");
  const [deletetrigger, setdeletetrigger] = useState("");

  function handleForm() {
    openForm.current.open();
  }
  function handleUpdateForm(product) {
    openupdateForm.current.open(product);
  }

  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts(userinfo.email));
    setForm("finished");
    setdeletetrigger("finished");
  }, [form, dispatch, deletetrigger]);

  // Function to sort products by price from lowest to highest
  const sortProductsByPrice = (a, b) => {
    return a.price - b.price;
  };

  // Flatten and sort the products array
  const sortedProducts = products.products
    ? products.products.flatMap(categoryProducts => categoryProducts.products)
      .sort(sortProductsByPrice)
    : [];

  return (
    <>
      <AdminHome tab='MenuItems' />

      <div className=''>
        <AddItem ref={openForm} onclick={setForm} email={email} />
      </div>

      <div className=''>
        <UpdateItem ref={openupdateForm} onclick={setForm} />
      </div>

      <div className="flex flex-row mx-3 items-center justify-center flex-wrap">
        <ProductPreviewCardAdmin onclick={handleForm} />
        {sortedProducts.map((product, index) => (
          <ProductPreviewCardAdmin key={index} product={product} updateForm={()=>{
            handleUpdateForm(product)
          } } onDelete={setdeletetrigger} />
        ))}
      </div>
    </>
  );
};
