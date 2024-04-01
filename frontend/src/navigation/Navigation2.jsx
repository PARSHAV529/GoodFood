import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DrawerAppBar from "../components/Header2.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../pages/Signup/Signup";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import { cartProducts } from "../store/cart/cartSlice";
import { user } from "../store/userInfo/userSlice.js";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Logout } from "../pages/Login/Logout";
import ProtectedRoute from "./ProtectedRoute";
import { fetchUserData } from "../store/userInfo/userSlice.js";
import FixedBottomNavigation from "../components/BottomNavigation.jsx";
import { clearUser } from "../store/userInfo/userSlice.js";
import { CategoriesAdmin } from "../adminPanel/CategoriesAdmin.jsx";
import { MenuItemsAdmin } from "../adminPanel/MenuItemsAdmin.jsx";
import { OrdersAdmin } from "../adminPanel/OrdersAdmin.jsx";
import Example from "../components/Header3.jsx";
import  UserProfile  from "../pages/UserProfile.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import AdminHome from "../adminPanel/AdminHome.jsx";


const ProviderPrivateRoute = ({ children }) => {
    const userInfo = useSelector(user);
    console.log(userInfo)
    return userInfo && userInfo.role ==='provider' ? children : <Navigate to="/" />;
  };
const UserPrivateRoute = ({ children }) => {
    const userInfo = useSelector(user);
    console.log(userInfo)
    return userInfo && userInfo.role ==='user' ? children : <Navigate to="/" />;
  };



const Navigation2    = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true)
  const productsInCart = useSelector(cartProducts);
  // console.log(productsInCart.length)


  let role = useSelector(user)
  let userRole = role.role
  // console.log(userRole.role)


  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    // setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserinfo(user);
        console.log(user.email);
        let email = user.email
        dispatch(fetchUserData({ email }));
          setLoading(false)

      } else {
        setUserinfo("");
        dispatch(clearUser())
        setLoading(false)

      }
    });
  }, [dispatch]);

  





  return (
    <>
    {loading? <div className="loader " /> :
    <BrowserRouter >
      <Example cartCount={productsInCart ? productsInCart.length : 0} /> 

      <Routes>
      <Route path="/" element={<Home name={userinfo && userinfo.displayName}/>} />
      <Route path="/provider/:providerId" element={<Home name={userinfo && userinfo.displayName}/>} />

        <Route path="/logout" element={<Logout />} />
       
        <Route path="/login" element={<Login googleRole='user' />} />
        <Route path="/user/register" element={<Signup role='user' />} />
      
        <Route path="/provider/register" element={<Signup role='provider' />} />

        <Route
        path="/menu"
        element={
          <UserPrivateRoute>
            <Menu />
          </UserPrivateRoute>
        }
      />
        <Route
        path="/provider/:providerId"
        element={
          <UserPrivateRoute>
            <Home />
          </UserPrivateRoute>
        }
      />
        <Route
        path="/userProfile"
        element={
          <UserPrivateRoute>
            <UserProfile />
          </UserPrivateRoute>
        }
      />
        <Route
        path="/cart"
        element={
          <UserPrivateRoute>
            <Cart />
          </UserPrivateRoute>
        }
      />

       
       
        

        <Route
        path="/admin/categories"
        element={
          <ProviderPrivateRoute>
            <CategoriesAdmin />
          </ProviderPrivateRoute>
        }
      />
        <Route
        path="/admin/orders"
        element={
          <ProviderPrivateRoute>
            <OrdersAdmin />
          </ProviderPrivateRoute>
        }
      />
        <Route
        path="/admin/menuitems"
        element={
          <ProviderPrivateRoute>
            <MenuItemsAdmin />
          </ProviderPrivateRoute>
        }
      />
     
    
        <Route path="*" element={ <NotFound/>} />

      




      </Routes>

   
        {/* <Footer /> */}
      { userRole==='user' || !userRole ? <FixedBottomNavigation /> : null}
     




    </BrowserRouter>}
    </>
  )
}

export default Navigation2;