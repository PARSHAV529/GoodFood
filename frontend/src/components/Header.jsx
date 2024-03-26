import Logo from '../images/food-logo-real.png'
import cart from '../images/cart1.svg'
import logo2 from '../images/Untitled design1.png'
import { Link } from "react-router-dom";
import { Logout } from '../pages/Login/Logout';
import { useState ,useEffect } from 'react';
import { auth } from "../firebase";
import { Dropdown } from 'bootstrap';
import DropdownMenu from './DropdownMenu';


export const Header = ({cartCount}) => {

    const [userName, setUserName] = useState("");

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUserName(user.displayName);
        //   console.log(user.displayName);
        } else setUserName("");
      });
    }, []);

   return(<>
   
   
   
   
   
   </>)
    
    // return (
    //     <nav id="header" className="bg-[#AA2B1D] sticky   top-0 z-10	w-full text-white md:flex-row items-center ">
    //         <div className="w-full  container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
    //             <div className="logo-wrapper pl-1 flex items-center">
    //                 <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg: text">
    //                     <img src={logo2} alt="logo" className="w-[9rem]  h-13 object-cover rounded" />
    //                 </Link>
    //             </div>
    //             <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
    //                 <Link to="/" className="text-xl">Home</Link>
    //                 <Link to="#about" className="text-xl">About</Link>
    //                 <Link to="/menu" className="text-xl">Menu</Link>
                    
    //             </div>
                // <div className="flex items-center justify-center space-x-4">
                //     <Link to="/cart" className="mr-4 relative">
                //         <img src={cart} alt="cart"  className='w-10 h-10'/>
                //         {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-5 h-5 absolute -top-0.5 -right-1">{cartCount}</div> : null}

                //     </Link>

                //     {userName ? <Link to="/logout">Log Out</Link> : <DropdownMenu /> }
                  
                   
                // </div>  
    //         </div>
    //     </nav>)
}