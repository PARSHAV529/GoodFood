import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from '../store/menu/productsSlice';
import { addToCart } from "../store/cart/cartSlice";
import { FallbackMenu } from "../components/FallbackMenu";
import { Tabs } from "../components/Tabs";
import { ProductPreviewCard } from "../components/ProductPreviewCard";
import toast from "react-hot-toast";
import { user } from "../store/userInfo/userSlice";

const Menu = () => {
    const dispatch = useDispatch();
    const userinfo = useSelector(user);
    const email = userinfo.providerid;

    useEffect(() => {
        if (email) {
            dispatch(fetchProducts(email));
        }
    }, [dispatch, email]);

    const products = useSelector(selectAllProducts);
    const [searchItem, setSearchItem] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const onAddProduct = (product) => {
        dispatch(addToCart(product));
        toast.success("Product added to cart!");
    };

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        const index = products.findIndex(product => product.name.name === newActiveTab);
        setActiveTabIndex(index >= 0 ? index : 0);
    };

    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchItem(searchTerm);
        const filteredProducts = products[activeTabIndex]?.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        setFilterdProducts(filteredProducts || []);
    };

    return (
        email ?
            <div className="bg-[#fff] mt-10 h-screen">
                {products && products.status !== 'fulfilled' ?
                    <div className="loader" /> :
                    <div className="menu-wrapper">
                        {products &&
                            <Tabs
                                list={products.map((product) => product.name.name)}
                                activeTab={activeTab}
                                onTabSwitch={onTabSwitch}
                                handleInputChange={handleInputChange}
                                searchItem={searchItem}
                            />
                        }
                        <div className="flex flex-row mx-4 justify-center flex-wrap">
                            {products[activeTabIndex]?.products.map((product, index) => (
                                <ProductPreviewCard key={index} product={product} onAddProduct={onAddProduct} />
                            ))}
                        </div>
                    </div>
                }
            </div> :
            <FallbackMenu />
    );
};

export default Menu;
