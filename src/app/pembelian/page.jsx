import Header from "@/components/Utilities/Header"
import { ArrowCircleLeft, CaretCircleDown, CaretCircleLeft } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

const Page = () => {
    return (
        
        <div className="container mx-6 py-8 storage-new overflow-hidden">
            <Header title={`Pembelian`} />
            <section className="text-start">
                <p className=" text-4xl font-bold mb-4 pt-10">WARKOP CAMP</p>
            </section>


            <section>
                <div className="flex flex-auto">
                    <Link href={`/`} type="button"
                        className="flex flex-row transition duration-200 ease-in-out transform hover:translate-x-2 hover:scale-x-110
                    bg-neutral-700/40 hover:bg-neutral-700 focus:outline-none focus:ring focus:ring-slate-700/90 
                    p-4 rounded-md border border-neutral-600/30">
                        <CaretCircleLeft
                            size={35}
                            color="#737373"
                            className="hover" />
                        <div>
                            <span className="text-xl font-semibold ">BACK</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>


    )
}

export default Page