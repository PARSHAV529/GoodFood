import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import DropdownMenu from './DropdownMenu';
import logo from '../images/food-logo-real.png';
import { useSelector } from 'react-redux';
import { user } from '../store/userInfo/userSlice';

const Example = (props) => {
    let role = useSelector(user)
    let userRole = role.role
    const [userEmail, setUserEmail] = useState("");



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
               
                setUserEmail(user.email)
            } else setUserEmail("");
        });
    }, []);

    return (
        <nav className="bg-transparent top-0 fixed w-full navbar z-50 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between md:flex-wrap items-center py-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white font-semibold text-xl"><img src={logo} className='h-8 scale-150 ' alt="Logo" /></a>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        { userRole==='user' ?<Link to="/cart" className="relative ">
                            <div className='text-white scale-110'>            
                                <ShoppingCartIcon />
                            </div>
                            { props.cartCount > 0 && <div className="rounded-full bg-yellow-400 text-sm text-white inline-flex justify-center items-center w-4 h-4 absolute -top-1.5 -right-1">{props.cartCount}</div>}
                        </Link>: null}
                        {userEmail ? (
                            <Link to="/logout" className=""><div className=' text-white  scale-110'><LogoutIcon /> </div></Link>
                        ) : (
                            <DropdownMenu />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Example;
