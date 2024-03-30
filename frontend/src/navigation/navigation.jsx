import { BrowserRouter, Route, Routes } from "react-router-dom";
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





const Navigation = () => {
  const dispatch = useDispatch();

  const productsInCart = useSelector(cartProducts);
  // console.log(productsInCart.length)


  let role = useSelector(user)
  let userRole = role.role
  // console.log(userRole.role)


  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserinfo(user);
        console.log(user.email);
        let email = user.email
        dispatch(fetchUserData({ email }));


      } else {
        setUserinfo("");
        dispatch(clearUser())
      }
    });
  }, [dispatch]);

  





  return (
    <BrowserRouter >
      <Example cartCount={productsInCart ? productsInCart.length : 0} /> 

      <Routes>
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/" element={<Home name={userName} />} /> */}
        <Route path="/:providerId" element={<ProtectedRoute component={Home} name={userinfo && userinfo.displayName} userRole={userRole} allowedRoles={['user', 'undifended']} />} />
        <Route path="/" element={<ProtectedRoute component={Home} name={userinfo && userinfo.displayName} userRole={userRole} allowedRoles={['user', 'undifended']} />} />
        <Route path="/login" element={<Login googleRole='user' />} />
        <Route path="/user/register" element={<Signup role='user' />} />
        {/* <Route path="/provider/login/" element={<Login googleRole='provider' />} /> */}
        <Route path="/provider/register/" element={<Signup role='provider' />} />
        <Route path="/menu" element={<ProtectedRoute component={Menu} userRole={userRole} allowedRoles={['user']} />} />
        <Route path="/cart" element={<ProtectedRoute component={Cart} userRole={userRole} allowedRoles={['user']} />} />
        <Route path="/userProfile" element={<ProtectedRoute component={UserProfile} userRole={userRole} allowedRoles={['user']} />} />
        <Route path="/admin/orders" element={<ProtectedRoute component={OrdersAdmin} userRole={userRole} allowedRoles={['provider']} />} />
        <Route path="/admin/categories" element={<ProtectedRoute component={CategoriesAdmin} userRole={userRole} allowedRoles={['provider']} />} />
        <Route path="/admin/menuitems" element={<ProtectedRoute component={MenuItemsAdmin} userRole={userRole} allowedRoles={['provider']} />} />
        <Route path="*" element={ <NotFound/>} />

        {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}




      </Routes>

   
        {/* <Footer /> */}
      { userRole==='user' || !userRole ? <FixedBottomNavigation /> : null}
     




    </BrowserRouter>
  )
}

export default Navigation;