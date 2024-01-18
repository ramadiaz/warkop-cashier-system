import Image from "next/image"
import Link from "next/link"


const Page = () => {
return (
    <div className="container mx-auto py-8">
        <section className="text-center">
            <h1 className="text-neutral-950 text-4xl font-bold mb-4">WARKOP CAMP</h1>
            <p className="text-neutral-950">Tujuan kami adalah memberikan pelayanan terbaik untuk setiap customer</p>
        </section>

        <section className="mt-8">
            <h2 className="text-2xl text-neutral-950 font-semibold mb-4">Please Select The Panel Below</h2>
            {/* Button Section Start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> 
                    <Link href={`/persediaan`} type="button" className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 p-4 rounded shadow-md">
                        <Image src="/img/persediaan.jpeg" alt="Picture Rendering" width={200} height={200} />
                        <p className="text-xl font-semibold mb-2 text-sky-50">PERSEDIAAN</p>
                        <h2 className=" text-sky-50">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                    </Link>
                    <Link href={`/pembelian`} type="button" className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 p-4 rounded shadow-md">
                        <Image src="/img/pembelian.jpeg" alt="Picture Rendering" width={200} height={200} />
                        <p className="text-xl font-semibold mb-2 text-sky-50">PERSEDIAAN</p>
                        <h2 className=" text-sky-50">Cek Menu Yang Masih Tersedia Untuk Kita Jual</h2>
                    </Link>
            </div>
            {/* Button Section End */}
        </section>
    </div>
)
}

export default Page