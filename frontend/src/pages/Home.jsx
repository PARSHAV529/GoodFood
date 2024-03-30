import { About } from "../components/About"
import { Banner } from "../components/Banner"
import { ProductsPreview } from "../components/Proudect_preview"
import HomeCrousel from "../components/HomeCrousel"
import { setUserProviderId } from "../store/userInfo/userSlice"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const Home = ({name}) => {
  const dispatch = useDispatch();
  const { providerId } = useParams();
  console.log(providerId)

  useEffect(() => {
   
    dispatch(setUserProviderId(providerId));
  }, [dispatch]);

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