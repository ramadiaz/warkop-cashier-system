"use client"

import { useSession } from "next-auth/react"
import ButtonHomepage from "@/components/Utilities/ButtonHomepage"

const Page = () => {
    const session = useSession()
    console.log(session)

    return (
        <div className="container mx-6 py-8">
            <section className="text-start">
                <h1 className=" text-4xl font-bold mb-4 pt-10">WARKOP CAMP</h1>
                {/* <p className="">Tujuan kami adalah memberikan pelayanan terbaik untuk setiap customer</p> */}
            </section>

            <section className="mt-8">
                <h2 className="text-2xl text-center font-semibold mb-6 mt-10 pt-10">Please Select The Panel Below</h2>
                {/* Button Section Start */}
                <div className="ButtonTransaction">
                    <div className="grid grid-cols-2 pt-8 justify-items-center">
                        <ButtonHomepage
                            input={'/storage'}
                            icon={'/icon/clipboard-text.svg'}
                            title={'Storage'}
                            desc={'Memantau Persediaan Menu Yang Dimiliki Saat Ini'}
                        />
                        <ButtonHomepage
                            input={'/transaction'}
                            icon={'/icon/shopping-cart-simple.svg'}
                            title={'Transaction'}
                            desc={'Melakukan Transaksi Pembelian Dengan Pelanggan'}
                        />
                    </div>
                    {/* Button Section End */}
                </div>
            </section>
        </div>
    )
}

export default Page