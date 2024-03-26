export const AddProduct = ({ onAddProduct }) => {
    
    return (
        <div className="flex justify-end">
            <button onClick={onAddProduct} className="bg-zinc-800 hover:bg-yellow-500 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center"><span>+</span></button>
        </div>
    )
}