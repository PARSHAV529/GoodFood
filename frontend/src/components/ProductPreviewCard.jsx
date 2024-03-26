import { AddProduct } from "./AddProduct";
import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import '../components/product.css';
import { toast } from "react-hot-toast";

// import 'react-toastify/dist/react-toastify.css'

export const ProductPreviewCard = ({ product, onAddProduct }) => {
    const cart = useSelector(cartProducts);

   

    const addProduct = () => {

        toast.success("Product added successfully");
      
      onAddProduct(product);
        // showToastMessage();
        // toast.success("Product added successfully")
        

    };

    return (
        <div className="food-container backdrop-filter flex justify-between items-start gap-4 w-full h-25 lg:w-1/2 lg:h-32">
            <img src={product.imageUrl} className="food-image w-1/3 lg:w-1/5 flex bg-white p-2 h-20 lg:h-full" alt={product.name} />
            <div className="flex-1">
                <div className="text-lg text-left  font-semibold">{(product.name).charAt(0).toUpperCase() + (product.name).slice(1)}</div>
                <div className="flex items-center h-10 lg:h-20 justify-between">
                    <div className="text-gray-800 font-bold">₹{product.price}</div>
                    <div className="flex items-end mr-5">
                        <AddProduct onAddProduct={addProduct} />
                        

                    </div>
                </div>
            </div>
        </div>
    );
};
