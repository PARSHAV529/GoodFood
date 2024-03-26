import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { cartProducts, clearCart } from "../store/cart/cartSlice";
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {user,loginUser} from '../store/userInfo/userSlice'
import axios from 'axios';



const send = async (userInfo) => {
  let userEmail = userInfo.email
  let recipientEmail={
    userEmail,

  }
  // console.log(recipientEmail)
  
  let subject= 'Your Order Conformation'
      let text=`Dear ${userInfo.email}, \n\nWe're excited to inform you that your order is Confirmed `
   
  
      try {
        const res = await axios.post('http://localhost:8080/api/send-email', { recipientEmail ,text,subject });
        console.log(res.data)
        // alert('Email sent successfully!');
        // setReload("email");
      } catch (error) {
        console.error('Error sending email:', error);
        // alert('Failed to send email.');
      }
    }

const addToDatabase = async (productName,quantity,ProductPrice,status,userEmail) => {
console.log(productName)
console.log(quantity)
console.log(userEmail)
console.log(status) 
console.log(ProductPrice)
  try {
    // Send cart item data to the server
    const response = await axios.post('http://localhost:8080/api/add-cart-item', {
      productName,
      quantity,
      ProductPrice,
      userEmail,
      status
    });
    console.log('Cart item added:', response.data);
  } catch (error) {
    console.error('Error adding cart item:', error);
  }
};

const addMultipleToDatabase = async (productQuantities, userEmail) => {
  try {
    // Create an array of promises for each item to be added to the database
    const promises = productQuantities.map(item =>{
      // console.log(item)
      addToDatabase(item.productName, item.quantity,item.ProductPrice,item.status, userEmail)}
    );

    // Execute all promises concurrently and wait for all of them to resolve
    const results = await Promise.all(promises);
    console.log('All items added successfully:', results);
  } catch (error) {
    console.error('Error adding multiple items to the database:', error);
    // Handle the error appropriately, such as displaying a message to the user
  }
};

  

export const Payment = () => {
  const dispatch = useDispatch();

  let total = 0
  const cart = useSelector(cartProducts);
  const userinfo = useSelector(user);



  const navigate = useNavigate();

  function handelpayment() {
    let options = {
      "key": 'rzp_test_JgdC6QIzSk8B1q'
      ,
      "amount": Number(total) * 100,
      "currency": "INR",
      "name": "food ordering",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "handler": function (response) {
        if (response.razorpay_payment_id) {
    
          // window.alert("Order Placed Succefully")
          dispatch(clearCart())
          navigate('/')

          const productQuantities = cart.map(product => {
            return {
              productName: product.name,
              quantity: product.amount,
              ProductPrice:product.price,
              status:"ordered"

            };
          });
          
          addMultipleToDatabase(productQuantities,userinfo.email)
          //  addToDatabase(productQuantities[0].productName, productQuantities[0].quantity, userinfo.email);
          send(userinfo)
          console.log(userinfo.email)

         
             
         

         
        } else {
          window.alert("Unable To Place Order Try Again")
        }
      },
      "prefill": {
        "name": "parshav",
        "email": "demo@demo.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#FFBE0B"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open()
  }
   total = cart.reduce((acc, curr) => acc + (curr.amount * curr.price), 0);

  return (

    <>
    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="text-left p-3 border border-gray-300">Product</th>
          <th className="text-center p-3 border border-gray-300">Amount</th>
          <th className="text-center p-3 border border-gray-300">Price</th>
          <th className="text-center p-3 border border-gray-300">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart && cart.map((product, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="p-3 border border-gray-300">{product.name}</td>
            <td className="text-center p-3 border border-gray-300">{product.amount}</td>
            <td className="text-center p-3 border border-gray-300">{product.price}₹</td>
            <td className="text-center p-3 border border-gray-300">{(product.amount) * (product.price)}₹</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-gray-200">
          <td colSpan="3" className="text-right p-3 border border-gray-300">Total</td>
          <td className="text-center p-3 border border-gray-300">{total}₹</td>
        </tr>
      </tfoot>
    </table>
  
    <div className="flex justify-end mt-5">
      <button onClick={handelpayment} className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Pay Now
      </button>
    </div>
  </>
  

  )
}
