"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/transaction/history", {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.body);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatedDate = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${dayOfWeek}, ${day}/${month}/${year} [${hours}:${minutes}:${seconds}]`;
  };

  return (
    <div className="transaction-history overflow-visible">
      <Header title={"Transactions History"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col overflow-x-scroll  h-[880px] w-full">
          <table className="text-sm">
            <thead>
              <tr className="divide-x divide-neutral-600/50 border-b border-neutral-600/50 sticky top-0 bg-neutral-800">
                <td className="whitespace-nowrap font-semibold py-2 px-4 text-center">
                  id
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  date
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  items
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  quantity
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  total payment
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  cash
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  change
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  cashier
                </td>
                <td className="whitespace-nowrap font-semibold px-4 py-2">
                  invoice
                </td>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-600/50">
              {transactions?.map((item, index) => {
                return (
                  <tr key={index} className="divide-x divide-neutral-600/50">
                    <td className="whitespace-nowrap py-2 px-4 w-16 text-center">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-24 text-right">
                      {formatedDate(item.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-96">
                      <ul>
                        {item.menus.map((menu, index) => {
                          return (
                            <li key={index} className="">
                              {menu.name}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-20">
                      <ul>
                        {item.menus.map((menu, index) => {
                          return (
                            <li key={index} className="">
                              x{menu.quantity}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-28">
                      Rp.{item.total.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-28">
                      Rp.{item.cash.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-28">
                      Rp.{item.change.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-64">
                      {item.cashier}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-neutral-900 transition-all duration-300 bg-green-500/70 hover:bg-green-500"
                        onClick={() => {
                          push(`/s/invoice/${item.id}`);
                        }}
                      >
                        Invoice
                      </button>
                    </td>
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
