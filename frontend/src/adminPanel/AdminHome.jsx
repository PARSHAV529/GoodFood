import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tabs } from '../components/Tabs';
import { selectAllProducts } from '../store/menu/productsSlice';

const AdminHome = ({tab,}) => {
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const products = useSelector(selectAllProducts);
    const list = ['categories', 'MenuItems', 'Orders'];
    const [activeTab, setActiveTab] = useState(tab);

    const onTabSwitch = (newActiveTab) => {
        // setActiveTab(tab);
        navigate(`/admin/${newActiveTab.toLowerCase()}`); // Use navigate function for navigation
    };

    return (
        <>
            <div className='flex flex-col mb-10 h-10 w-screen items-center justify-center'>
                {products.products && <Tabs list={list} activeTab={activeTab} onTabSwitch={onTabSwitch} />}
            </div>
        </>
    );
};

export default AdminHome;
