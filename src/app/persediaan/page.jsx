import Link from "next/link"

const Page = () => {
    return (
        <div className="container mx-6 py-8">
        <section className="text-start">
            <p className=" text-4xl font-bold mb-4 pt-10">WARKOP CAMP</p>
            {/* <h1 className="text-3xl">Pembelian</h1> */}
        </section>
      

            <section> 
                    <Link href={`/`} type="button" className="bg-neutral-700/40 hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring focus:ring-slate-700/90 p-4 rounded-md border border-neutral-600/30">
                        <p className="text-xl font-semibold mb-2">BACK</p>
                        <h2 className="">Kembali Ke Menu Utama</h2>
                    </Link>
                </section>
        </div>
    )
    }
        
        export default Page