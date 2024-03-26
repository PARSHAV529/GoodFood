import aboutImage from "../images/aboutUs.jpg";

export const About = () => {
    return (
        <div className="bg-white shadow-lg">
            <div className="p-4 md:p-8 lg:p-12 grid md:grid-cols-2">
                <div className="md:pr-8 lg:pr-12">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">About Us</h2>
                    <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                        At Our Restaurant, we believe in providing our customers with an exceptional dining experience. 
                        Our journey began in 2005 when our founder, John Doe, envisioned a place where people could 
                        enjoy delicious meals in a warm and welcoming environment. Since then, we have been dedicated 
                        to serving high-quality food made with the freshest ingredients sourced locally. Our talented 
                        chefs craft each dish with passion and creativity to delight your taste buds.
                    </p>
                   
                </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="About Us" className="w-full md:w-[300px] lg:w-[400px] h-auto object-cover rounded-md border-4 border-yellow-400" />
                </div>
            </div>
        </div>
    )
}
