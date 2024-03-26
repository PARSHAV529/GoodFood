import { auth} from '../../firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import  {clearUser}  from '../../store/userInfo/userSlice';
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../store/cart/cartSlice';
export const Logout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
  
 
 
        
        signOut(auth).then(()=>{
            dispatch(clearUser());
            dispatch(clearCart())
        console.log('logout completed');
        navigate("/")
        // sessionStorage.setItem('role','undifended');
        
    }).catch()
  
}
