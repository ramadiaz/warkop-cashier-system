import Link from "next/link"

const Page = () => {
return (
        <div className="container mx-auto py-8">
            <section className="text-center">
                <h1 className="text-slate-100 text-4xl font-bold mb-4">WARKOP CAMP</h1>
                <p className="text-slate-100">Tujuan kami adalah memberikan pelayanan terbaik untuk setiap customer</p>
            </section>

            <section>
                    <Link href={`/#`} type="button" className="bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring focus:ring-blue-300 p-4 rounded-3xl">
                        <p className="text-xl font-semibold mb-2 text-slate-100">BACK</p>
                        <h2 className=" text-slate-100">Kembali Ke Menu Utama</h2>
                    </Link>
                </section>
        </div>
    

   
)
}
    
    export default Page