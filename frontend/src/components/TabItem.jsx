export const TabItem = ({ title, index, active, setActive}) => {
    const className = active ? 'border-b-[#f37e6b]' : 'border-none text-slate-400';

    return (
        <div className="nav-item px-2">
            <button onClick={() => setActive(title)} className="pt-7 pb-3">
                <span className={`hover:text-[#f37e6b] transition-colors border-b-2 ${className}`}>
                    {title}

                </span>
            </button>
        </div> 
    )
}