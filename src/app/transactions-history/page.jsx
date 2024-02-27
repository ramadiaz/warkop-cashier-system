"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";

const Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getTransactions");

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.body);
        console.log(data.body);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="transaction-history">
      <Header title={"Transactions History"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <table>
            <thead>
              <tr>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold py-2">id</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">date</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">items</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">quantity</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">totalAmount</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">cash</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">change</td>
                <td className="whitespace-nowrap border border-neutral-600/50 font-semibold px-4 py-2">cashier</td>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap border border-neutral-600/50 py-2 text">{item.id}</td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">{item.createdAt}</td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">
                      <ul>
                        {item.menus.map((menu, index) => {
                          return <li key={index} className="">{menu.name}</li>;
                        })}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">
                      <ul>
                        {item.menus.map((menu, index) => {
                          return <li key={index} className="">x{menu.quantity}</li>;
                        })}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">{item.totalAmount}</td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">{item.cash}</td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">{item.change}</td>
                    <td className="whitespace-nowrap border border-neutral-600/50 px-4 py-2 text">{item.cashier.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
