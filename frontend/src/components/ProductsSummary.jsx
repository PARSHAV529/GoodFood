import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductSummaryCard";

export const ProductsSummary = () => {
    const cart = useSelector(cartProducts);

    return (
        <div className="flex flex-col justify-center gap-4 items-center container-with-hidden-scrollbar">
            {cart && cart.map((product, index) => (
                <ProductsSummaryCard product={product} key={index} />
            ))}
        </div>
    )
}
