import { useNavigate } from 'react-router-dom'
import Button from '../elements/Button'
import bannerimg from '../images/piz.jpg'
// import bg from '../images/home bg.jpg'

export const Banner = ({ name }) => {
   let navigate=useNavigate();
    return (
        <div className="z-10 relative w-full md:w-2/3 mx-auto text-center">
            <div className="banner absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-6 rounded-lg shadow-lg ">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8)' }}>
                    Food Ordering Made Easy
                </h2>
                <p className="text-lg md:text-xl font-semibold text-white py-2" style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.9)' }}>
                    Get Started Today {name}!
                </p>
                <div className="btn-container">
                    <Button className="transform transition-transform bg-[#ffbc0d] hover:scale-105" onClick={()=>{
                        navigate('/menu');
                    }}>Order Now</Button>
                    <a href="/menu" className="text-[#ffbc0d] hover:text-yellow-500 font-bold text-decoration-line px-3">
                        See Menu
                    </a>
                </div>
            </div>
        </div>
    )
}
