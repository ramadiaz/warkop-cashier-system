const Page = () => {
return (
    <div class="container mx-auto mt-8">
        <section class="text-center">
            <h1 class="text-4xl font-bold mb-4">WARKOP CAMP</h1>
            <p class="text-gray-600">Tujuan kami adalah memberikan pelayanan terbaik untuk setiap customer</p>
        </section>

        <section class="mt-8">
            <h2 class="text-2xl font-semibold mb-4">Please Select The Panel Below</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Pembukaan */}
                <div class="bg-white p-4 rounded shadow-md">
                    <h3 class="text-xl font-semibold mb-2 text-slate-900">PERSEDIAAN</h3>
                    <p class=" text-slate-900">Cek Menu Yang Masih Tersedia Untuk Kita Jual</p>
                </div>
                <div class="bg-white p-4 rounded shadow-md">
                    <h3 class="text-xl font-semibold mb-2 text-slate-900">PEMBELIAN</h3>
                    <p class=" text-slate-900">Input Pesanan Pelanggan dan Cetak Struk</p>
                </div>
            </div>
        </section>
    </div>
)
}

export default Page