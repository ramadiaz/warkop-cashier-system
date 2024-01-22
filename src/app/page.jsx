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
                    <Link href={`/persediaan`} type="button" className="cursor-none relative group bg-neutral-700/40 p-4
                      before:absolute 
                      before:inset-0 
                      before:bg-neutral-700
                      before:scale-x-0 
                      before:origin-right
                      before:transition
                      before:duration-300
                      hover:before:scale-x-100
                      hover:before:origin-left">
                        <span><div className="relative flex flex-col items-center">
                            <ClipboardText size={100} color="#737373" />
                            <p className="text-xl font-semibold pt-2">PERSEDIAAN</p>
                            <h2 className="">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                        </div></span>
                    </Link>
                    <Link href={`/pembelian`} type="button" className="cursor-none relative group bg-neutral-700/40 p-4
                      before:absolute 
                      before:inset-0 
                      before:bg-neutral-700
                      before:scale-x-0 
                      before:origin-right
                      before:transition
                      before:duration-300
                      hover:before:scale-x-100
                      hover:before:origin-left">
                        <span><div className="relative flex flex-col items-center">
                            <ShoppingCartSimple size={100} color="#737373" />
                            <p className=" text-xl font-semibold pt-2">PEMBELIAN</p>
                            <h2 className="">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                        </div></span>
                    </Link>
                </div>
                {/* Button Section End */}
            </section>
        </div>
    )
}

export default Page