import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts,selectAllProducts} from '../store/menu/productsSlice'
import ProductDetailCard from '../components/ProductDetailCard'
import { Tabs } from "../components/Tabs";
import { addToCart } from "../store/cart/cartSlice";
import { ProductPreviewCard } from "../components/ProductPreviewCard";
import toast from "react-hot-toast";
import { user } from "../store/userInfo/userSlice";
import { FallbackMenu } from "../components/FallbackMenu";
import { useNavigate } from "react-router-dom";




const Menu = ()=>{

    const dispatch = useDispatch();

    const userinfo = useSelector(user)
    const email = userinfo.providerid
    console.log(userinfo.providerid)

    
   

    const products = useSelector(selectAllProducts);
 
    const navigate = useNavigate()
    const [filterdProducts,setFilterdProducts]= useState(products);
    
    const [searchItem, setSearchItem] = useState('')
    // console.log(filterdProducts)
    // console.log(JSON.stringify(products))
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const onAddProduct = (product) => {

        dispatch(addToCart(product))
        
        navigate('/cart')
        }
    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let categories = products.products.map((product) => product.name.name);
        categories.sort();
        
        let index = categories.findIndex(category => newActiveTab === category);
        
        console.log(index);
        if (index > -1) {
            setActiveTabIndex(index);
        } else {
            setActiveTabIndex(0);
        }
        
    }

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    
        for (const product of product.products) {
            for (const subProduct of product.products) {
                // Check if product name matches
                if (subProduct.name.toLowerCase() === searchTerm.toLowerCase()) {
                    setFilterdProducts(subProduct)
                }
            }
        }
      }
      console.log(email)
      console.log(products.length )

    return(
        
        email && products &&  products.products.length > 0 ?
        
        <div className="bg-[#fff] mt-10 h-screen">
           {
           products && products.status !== 'fulfilled' ?
            <div className="loader " /> :
            <div className="menu-wrapper ">
                {
                    products.products &&
                    <Tabs
                        list={products.products.map((product) => product.name.name)}
                        activeTab={activeTab}
                        onTabSwitch={onTabSwitch}
                        handleInputChange={handleInputChange}
                        searchItem={searchItem}
                        
                        />
                }
                <div className="flex flex-row mx-4 justify-center  flex-wrap">
                {
                    products.products && products.products[activeTabIndex].products.map((product, index) => {
                        return (
                           <ProductPreviewCard key={index} product={product} onAddProduct={onAddProduct}/>
                        )
                    })
                }
                </div>
            </div>
           }
        </div>:<FallbackMenu/>
    )
}

export default Menu