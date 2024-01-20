import { ClipboardText, ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"


const Page = () => {
return (
    <div className="container mx-6 py-8">
        <section className="text-start">
            <h1 className=" text-4xl font-bold mb-4 pt-10">WARKOP CAMP</h1>
            {/* <p className="">Tujuan kami adalah memberikan pelayanan terbaik untuk setiap customer</p> */}
        </section>

        <section className="mt-8">
            <h2 className="text-2xl text-center font-semibold mb-6 mt-10 pt-10">Please Select The Panel Below</h2>
            {/* Button Section Start */}
            <div className="grid grid-cols-2 gap-8 px-4"> 
                    <Link href={`/persediaan`} type="button" className="bg-neutral-700/40 hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring focus:ring-slate-700/90 p-4 rounded-md border border-neutral-600/30">
                        <div className="flex flex-col items-center">
                            <ClipboardText size={100} color="#737373"/>
                            <p className="text-xl font-semibold mb-2">PERSEDIAAN</p>
                            <h2 className="">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                        </div>
                        </Link>
                    <Link href={`/pembelian`} type="button" className="bg-neutral-700/40 hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring focus:ring-slate-700/90 p-4 rounded-md border border-neutral-600/30">
                        <div className="flex flex-col items-center">
                            <ShoppingCartSimple size={100} color="#737373"/>
                            <p className=" text-xl font-semibold mb-2">PEMBELIAN</p>
                            <h2 className="">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                        </div>
                    </Link>
            </div>
            {/* Button Section End */}
        </section>
    </div>
)
}

export default Page