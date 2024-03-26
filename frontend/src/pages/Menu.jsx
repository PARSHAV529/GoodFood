import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts,selectAllProducts} from '../store/menu/productsSlice'
import ProductDetailCard from '../components/ProductDetailCard'
import { Tabs } from "../components/Tabs";
import { addToCart } from "../store/cart/cartSlice";
import { ProductPreviewCard } from "../components/ProductPreviewCard";
import toast from "react-hot-toast";




const Menu = ()=>{

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [searchItem, setSearchItem] = useState('')
    const [filterdProducts,setFilterdProducts]= useState(products);
    // console.log(filterdProducts)
    // console.log(JSON.stringify(products))
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const onAddProduct = (product) => {
        
        // toast.success("Successfully toasted!")
        dispatch(addToCart(product))
    }
    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let categories = products.products.map((product) => product.name.name);
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

    return(
        
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
        </div>
    )
}

export default Menu