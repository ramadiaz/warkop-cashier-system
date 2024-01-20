const Header = ({title}) => {
    return (
        <div className="w-full border-b border-neutral-600/50">
            <h1 className="py-4 px-4 text-xl font-semibold">{title}</h1>
        </div>
    )
}

export default Header