import Link from "next/link"

const ButtonHomepage = ({ input, icon, title, desc }) => {
    return (
        <div>
            <Link href={input} type="button" className="relative group bg-neutral-700/40 p-4
                      before:absolute 
                      before:inset-0 
                      before:bg-neutral-700
                      before:scale-x-0 
                      before:origin-right
                      before:transition
                      before:duration-300
                      hover:before:scale-x-100
                      hover:before:origin-left">
                <span>
                    <div className="relative flex flex-col mx-10 items-center">
                        <div>
                            <img
                                src={icon}
                                height={100}
                                width={100}
                                alt="Loading Image" />
                        </div>
                        <p className="text-xl font-semibold pt-2">{title}</p>
                        <h2 className="">{desc}</h2>
                    </div>
                </span>
            </Link>
        </div>

    )
}

export default ButtonHomepage