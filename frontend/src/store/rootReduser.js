import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/productsSlice";
import userReducer from './userInfo/userSlice'
 const rootReducer =combineReducers(
    {
        cart: cartReducer,
        products: productReducer,
        user: userReducer
    }
);

export default rootReducer;