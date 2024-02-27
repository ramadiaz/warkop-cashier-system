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
    const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1 to get 1-12 range
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
        <div className="flex flex-col overflow-auto h-[880px] w-max">
          <table className="text-sm">
            <thead>
              <tr className="divide-x divide-neutral-600/50 border-b border-neutral-600/50 sticky top-0 bg-neutral-800">
                <td className="whitespace-nowrap font-semibold py-2 px-4">
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
                  totalAmount
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
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-600/50">
              {transactions?.map((item, index) => {
                return (
                  <tr key={index} className="divide-x divide-neutral-600/50">
                    <td className="whitespace-nowrap py-2 px-4 w-16">{item.id}</td>
                    <td className="whitespace-nowrap px-4 py-2 w-24 text-right">
                      {formatedDate(item.createdAt)}
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
                      Rp.{item.totalAmount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-28">
                      Rp.{item.cash.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-28">
                      Rp.{item.change.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 w-96">
                      {item.cashier.name}
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
