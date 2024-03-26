import React, { useRef } from 'react'
import AdminHome from './AdminHome'
import { OrderCard } from './OrderCard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import gif from '../assets/Empty.gif'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const OrdersAdmin = () => {
  const [cartItems, setCartItems] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [reload, setReload] = useState("");

  const send = async (recipientEmail) => {
let subject= 'Your Order is Redy !!'
    let text=`Dear ${recipientEmail.userEmail}, \n\nWe're excited to inform you that your order is now ready for pickup! Please head over to our store counter to collect your items at your earliest convenience.
    
    \n \n Order Details: \n Product Name: ${recipientEmail.productName}  \n Quantity: ${recipientEmail.quantity} \n\nIf you have any questions or concerns about your order, please don't hesitate to contact us. We're here to help!
    \n Thank you for choosing us, and we hope you enjoy your purchase!
     \nBest regards,\nGood-Food`
    

    try {
      const res = await axios.post('http://localhost:8080/api/send-email', { recipientEmail ,text,subject });
      console.log(res.data)
      alert('Email sent successfully!');
      setReload("email");
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  }

  const updateCart = async (item, status) => {
    try {
      const formData = {
        ...item,
        status: status
      }
  
      const response = await axios.put(`http://localhost:8080/api/update-cart-item/${item._id}`, formData);
      console.log('Cart item updated:', response.data);
  
      setReload("done");
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart-items');
        const sortedCartItems = response.data.sort((a, b) => {
          if (a.status === "Received" && b.status !== "Received") return 1;
          if (a.status !== "Received" && b.status === "Received") return -1;
          return 0;
        });
        setCartItems(sortedCartItems);
  
        // Disable email button for items with "Received" status
        const disabledButtonsIds = sortedCartItems
          .filter(item => item.status === "Received")
          .map(item => item._id);
        setDisabledButtons(disabledButtonsIds);
        
        setReload(""); // Reset reload flag
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems(); // Fetch cart items initially
    const intervalId = setInterval(fetchCartItems, 5000); // Fetch cart items every 5 seconds
  
    return () => clearInterval(intervalId); // Clean up interval
  }, [reload]); // Reload whenever 'reload' changes
  
  
  
  

  return (
    <>
      <AdminHome tab="Orders" />
{cartItems ? 
      <div className=' mx-20 '>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className=' !bg-[#AA2B1D]'>
              <TableRow>
                <StyledTableCell align="center">Food Item Name</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">UserEmail</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Done</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align='center'>
                    {row.productName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="center">{row.userEmail}</StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      disabled={disabledButtons.includes(row._id)}
                      onClick={() => {
                        updateCart(row, "Received");
                      }}
                      className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                        disabledButtons.includes(row._id) ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Done
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <button
  onClick={() => {
    updateCart(row, "Email Sent");
    send(row);
  }}
  disabled={disabledButtons.includes(row._id)}
  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
    disabledButtons.includes(row._id) ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  Email
</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> : <div> <img src={gif} alt="" srcset="" /></div>
}    </>
  );
}
