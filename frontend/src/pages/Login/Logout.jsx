import { auth} from '../../firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import  {clearUser, user}  from '../../store/userInfo/userSlice';
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../store/cart/cartSlice';
export const Logout = () => {
    const dispatch = useDispatch();
    const userinfo = useSelector(user)
    const navigate = useNavigate();
  
 
 
        
        signOut(auth).then(()=>{
            dispatch(clearUser());
            dispatch(clearCart())
        console.log('logout completed');
        userinfo && userinfo.providerid ? navigate(`/provider/${userinfo && userinfo.providerid }`) : navigate('/');

        // sessionStorage.setItem('role','undifended');
        
    }).catch()
  
}
