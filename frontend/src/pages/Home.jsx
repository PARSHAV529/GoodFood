import { About } from "../components/About"
import { Banner } from "../components/Banner"
import { ProductsPreview } from "../components/Proudect_preview"
import HomeCrousel from "../components/HomeCrousel"
import { setUserProviderId } from "../store/userInfo/userSlice"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchProducts } from "../store/menu/productsSlice"

const Home = ({name}) => {
  const dispatch = useDispatch();
  const { providerId } = useParams();
  

  useEffect(() => {
    console.log(providerId)
    dispatch(setUserProviderId(providerId));
  }, [dispatch]);

  useEffect(() => {
    if(providerId){
        dispatch(fetchProducts(providerId))
        console.log(providerId)   
    }
         
}, [])

    return (<div className="bg-[#fff]">
     <div className="">
      <div className="absolute  top-0 left-0 w-full h-full flex justify-center items-center">
        <Banner name={name}  />
      </div>
      <HomeCrousel />
    </div>
{/* <ProductsPreview/> */}
        <About /></div>)
}

export default Home