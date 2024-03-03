"use client";

import { useSession } from "next-auth/react";
import ButtonHomepage from "@/components/Utilities/ButtonHomepage";
import Header from "@/components/Utilities/Header";

const Page = () => {
  const session = useSession();
  
  return (
    <div className="w-full">
      <Header title={`Dashboard`}/>
      <section className="mx-auto w-max">
        <h1 className="uppercase text-4xl font-bold my-10">warkop cashier system</h1>
      </section>

      <section className="">
        <h2 className="text-2xl text-center font-semibold mb-8">
          Please select the panel below*
        </h2>

        <div className="ButtonTransaction justify-items-center">
          <div className="w-[900px] grid grid-cols-2 gap-6 justify-items-center mx-auto">
            <ButtonHomepage
              input={"/storage"}
              icon={"/icon/clipboard-text.svg"}
              title={"Storage"}
              desc={"Monitoring current menu inventory"}
            />
            <ButtonHomepage
              input={"/transaction"}
              icon={"/icon/shopping-cart-simple.svg"}
              title={"Transaction"}
              desc={"Transactions with customers"}
            />
            <ButtonHomepage
              input={"/transactions-history"}
              icon={"/icon/history.svg"}
              title={"Transaction History"}
              desc={"Monitoring transactions history and print invoices"}
            />
            <ButtonHomepage
              input={"/settings"}
              icon={"/icon/settings.svg"}
              title={"Settings"}
              desc={"View cashier profile and setting account"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
