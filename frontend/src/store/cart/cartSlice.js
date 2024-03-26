import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
    products: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
           
             const { name } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product.name === name);
console.log(existingProductIndex)
            if (existingProductIndex !== -1) {
                // If product already exists, increment its amount
                // state.products[existingProductIndex].amount += 1;
                            return { products: state.products.map(product => product.name === action.payload.name ? {...product, amount: product.amount + 1} : product)}

            } else {
                // If product doesn't exist, add it to the cart
                
                return { products: [...state.products, {...action.payload, amount: 1}]}
            }
        },
        clearCart: () => {
            return { products: []}
        },
        incrementProductAmount: (state, action) => {
            console.log('increment');
            return { products: state.products.map(product => product.name === action.payload.name ? {...product, amount: product.amount + 1} : product)}
        },
        decrementProductAmount: (state, action) => {
            // return { products: state.products.map(product => product.name === action.payload.name ? {...product, amount: product.amount - 1} : product)}
            const { name } = action.payload;
            const productToUpdate = state.products.find(product => product.name === name);
            if (productToUpdate) {
                // If amount becomes 0, remove the product from the cart
                if (productToUpdate.amount === 1) {
                    state.products = state.products.filter(product => product.name !== name);
                } else {
                    productToUpdate.amount -= 1;
                }
            }
        
        }
    }
})

export const cartProducts = state => state.cart.products

export const {  addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions

export default cartSlice.reducer