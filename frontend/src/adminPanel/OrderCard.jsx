import React from 'react'
import axios from 'axios';

const send = async (recipientEmail) => {

    try {
        const res= await axios.post('https://goodfood-909g.onrender.com/api/send-email', { recipientEmail });
        console.log(res.data)
        alert('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
    }
}

const deleteCartItem = async (itemId) => {
    try {
        const response = await axios.delete(`https://goodfood-909g.onrender.com/delete-cart-item/${itemId}`);
        console.log('Cart item deleted:', response.data);
        // Optionally, update the cart state or UI after deletion
    } catch (error) {
        console.error('Error deleting cart item:', error);
    }
};
export const OrderCard = ({ item, onDelete }) => {
    return (
        <>
            <div className='flex justify-center '>
                <div class="flex  justify-between  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className='h-full w-[20rem] p-5 flex !flex-col  gap-4 items-start justify-center bg-white border border-gray-200  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                        <div >Order: {item.productName}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div >userEmail: {item.userEmail}</div>
                    </div>

                    <div class="flex flex-col justify-between p-5 leading-normal">
                        <button onClick={() => {
                            deleteCartItem(item._id)
                            onDelete("delete")
                        }} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Done</button>
                        <button onClick={() => send(item)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>email</button>
                    </div>
                </div>

            </div></>
    )
}
