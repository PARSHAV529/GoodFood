import { About } from "../components/About"
import { Banner } from "../components/Banner"
import { ProductsPreview } from "../components/Proudect_preview"
import HomeCrousel from "../components/HomeCrousel"
import { setUserProviderEmail, setUserProviderId } from "../store/userInfo/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchProducts } from "../store/menu/productsSlice"
import axios from "axios"
import { clearCart } from "../store/cart/cartSlice"

const Home = ({name}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
 
 useEffect(() => {
    // Function to fetch email based on user ID
    const fetchEmail = async () => {
      try {
   

       const response =  await axios.get(`https://goodfood-909g.onrender.com/api/user/${providerId}`) 
        setEmail(response.data.email);
        dispatch(setUserProviderEmail(response.data.email))

        setIsLoading(false)


      } catch (error) {
        navigate("/")
        setIsLoading(false)

        console.error('Error fetching email:', error);
        
      }
    };

    if (providerId!==undefined) {
      fetchEmail(); 
      
    }else{
      dispatch(setUserProviderEmail(""));
    }
  }, [dispatch,providerId]);

  useEffect(() => {

    dispatch(setUserProviderId(providerId));

  },[dispatch,providerId]);

  
 

  useEffect(() => {
    if( providerId!=='undefined' && email){

        dispatch(fetchProducts(email)) 
        console.log(email)   
    }

    setIsLoading(false)

         
}, [email,providerId])

    return (
      isLoading? <div className='loader'/>:
    
    <div className="bg-[#fff]">
     <div className="">
      <div className="absolute  top-0 left-0 w-full h-full flex justify-center items-center">
        <Banner name={name}  />
      </div>
      <HomeCrousel />
    </div>
{/* <ProductsPreview/> */}
        {/* <About /> */}
        </div>)
}

export default Home