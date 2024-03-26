import AddIcon from '@mui/icons-material/Add';
import '../components/product.css'

export const ProductPreviewCardAdmin = ({ product, onclick }) => {




    return (<>



        <div className="food-container w-[25rem] flex gap-5  h-[10rem]  ">
            {!product &&
                <div className="w-full ml-[1.75rem]  flex justify-center items-center">
                    <button onClick={onclick} className='border-2 bg-[#AA2B1D] p-2 hover:bg-[#be3f31] text-white rounded-md 	 flex'><AddIcon className='scale-90' />Add Items</button>
                </div>}



            {product && <img src={product.imageUrl} className='food-image-admin  h-[10rem]' />}

            <div className="food-details flex flex-col gap-3 overflow-auto">
                <div className="food-name flex !text-sm">  {product && `Name: ${(product.name).charAt(0).toUpperCase() + (product.name).slice(1)}`}</div>

                <div className="food-price flex"> {product && `Price: ₹${product.price}`}</div>
                <div className="cart flex gap-1  text-sm">

                    {product && `category: ${product.category.name}`}

                </div>


            </div>
        </div>





    </>
    )

}