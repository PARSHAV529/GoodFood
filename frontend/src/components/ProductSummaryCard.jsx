import { useDispatch } from "react-redux";
import { incrementProductAmount, decrementProductAmount, clearCart } from "../store/cart/cartSlice";

export const ProductsSummaryCard = ({ product }) => {
    const dispatch = useDispatch();

    // Function to capitalize the first letter of each word
    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="flex justify-between w-2/3 lg:h-50 h-20  border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition duration-300 ease-in-out">
            <div className="w-1/5  ">
                <img src={product.imageUrl} alt={product.name} className="rounded-lg lg:h-30   h-full w-full   " />
            </div>

            <div className="flex-1 flex flex-col  ">
                <div className="flex justify-between items-start ">
                 
                    <h3 className="lg:text-lg mt-2 text-[0.8rem] md:text-lg lg:m-3 font-bold">{capitalizeFirstLetter(product.name)}</h3>
                   
                   
                    <div className="lg:text-lg text-[0.8rem]  sm:text-sm font-semibold mt-3 sm:mt-8 lg:mt-3">{`${product.price}₹`}</div>
                    <div className="h-7 w-20 flex justify-center items-center mt-3 scale-75 ml-3 sm:scale-90 lg:scale-125 sm:mt-8 lg:mt-3 sm:mr-5 lg:mr-10 ">
                        <button className=" w-1/3   bg-gray-200 text-gray-700 hover:bg-gray-300 " onClick={() => {
                            if (product.amount === 0) {
                                dispatch(clearCart(product))
                            }
                            dispatch(decrementProductAmount(product))
                        }}>-</button>
                        <span className=" w-1/3  bg-gray-200 text-gray-700 font-semibold">{product.amount}</span>
                        <button className=" w-1/3   bg-gray-200 text-gray-700 hover:bg-gray-300 " onClick={() => dispatch(incrementProductAmount(product))}>+</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
