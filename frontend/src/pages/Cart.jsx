import {Tabs} from '../components/Tabs'
import Button from '../elements/Button'
import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import useTabSwitch from '../components/hooks/useTabSwitch';
import { ProductsSummary } from '../components/ProductsSummary';
import {useNavigate } from 'react-router-dom';
import { Payment } from '../components/Payment';





const Cart = () => {
    const navigate = useNavigate();

    const cart = useSelector(cartProducts);
    const tabs = ['Summary', 'Payment'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

    

    

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-2/3  text-black  items-center flex flex-col justify-center p-4">
                <img src="https://i.pinimg.com/564x/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg" alt="empty cart" className='w-[30rem] h-[25rem]' />
                <h1 className=''>Your Cart is empty</h1>
                <button className='mt-5 bg-marigold p-2 text-lg text-white rounded-md' onClick={()=>{
                    navigate("/menu")
                    

                }} >Browse Menu</button>
            </div>
        )
    }
    return (<><div className="bg-white h-full text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
        <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
        <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}   items-center`}>
            <ProductsSummary />
            <div className="flex justify-end mr-40 p-2">
                <Button variant="dark" className="flex items-center lg:scale-100 scale-75" onClick={() => handleTabSwitch('Payment')}><span className="mr-1">Check Out</span></Button>
            </div>
        </div>
        
        <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''} flex flex-col items-center justify-center`}>
            {/* <StripeWrapper /> */}
           <Payment/>
        </div>
    </div></>)
}

export default Cart