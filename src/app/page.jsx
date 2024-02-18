"use client";

import { useSession } from "next-auth/react";
import ButtonHomepage from "@/components/Utilities/ButtonHomepage";

const Page = () => {
  const session = useSession();
  

  return (
    <div className="w-full">
      <section className="text-start mx-6 mt-20">
        <h1 className=" text-4xl font-bold mb-4 pt-10">
          WARKOP CAMP CASHIER SYSTEM
        </h1>
      </section>

      <section className="mt-8 mx-6">
        <h2 className="text-2xl text-center font-semibold mb-6 mt-10 pt-10">
          Please Select The Panel Below
        </h2>

        <div className="ButtonTransaction justify-items-center">
          <div className="grid grid-cols-2 pt-8 gap-6 justify-items-center">
            <ButtonHomepage
              input={"/storage"}
              icon={"/icon/clipboard-text.svg"}
              title={"Storage"}
              desc={"Memantau Persediaan Menu Yang Dimiliki Saat Ini"}
            />
            <ButtonHomepage
              input={"/transaction"}
              icon={"/icon/shopping-cart-simple.svg"}
              title={"Transaction"}
              desc={"Melakukan Transaksi Pembelian Dengan Pelanggan"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
