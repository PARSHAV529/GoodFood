import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { user } from "../userInfo/userSlice";
import axios from "axios";

const initialState = {
    products: [],
    error: null,
    status: 'idle',
}



export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = [...action.payload.data]
        });
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending'
        })
    }
})

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (email) => {
    console.log(email)
    const response = await axios.get(`https://goodfood-909g.onrender.com/api/products-by-categories?provideremail=${email}`)
    const data =  response.data

   
    return data
})

export const selectAllProducts = state => state.products