"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import Loading from "../loading";

const Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/v1/getTransactions");

    if (response.ok) {
      const data = await response.json();
      setTransactions(data);
    }

    const menu = await fetch("/api/v1/getMenu");

    if (menu.ok) {
      const data = await menu.json();
      setMenus(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="transactions-history">
      <Header title={`Transactions History`} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-h-screen overflow-y-auto pb-16">
          <table className="text-sm text-left">
            <thead className="bg-neutral-800 sticky top-0">
              <tr>
                <th className="w-20 px-4 py-2 border-r border-b border-neutral-600/50 text-center whitespace-nowrap">
                  invoice id
                </th>
                <th className="w-72 px-4 py-2 border-r border-b border-neutral-600/50">
                  item
                </th>
                <th className="w-20 px-4 py-2 border-r border-b border-neutral-600/50 text-center">
                  quantity
                </th>
                <th className="w-40 px-4 py-2 border-r border-b border-neutral-600/50">
                  total
                </th>
                <th className="w-40 px-4 py-2 border-r border-b border-neutral-600/50">
                  cashier
                </th>
                <th className="w-60 px-4 py-2 border-r border-b border-neutral-600/50">
                  date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.body?.map((transaction, index) => {
                const itemData = menus.body.find(
                  (item) => item.id === transaction.menuId
                );

                return (
                  <tr key={index}>
                    <td className="w-20 px-4 py-2 border border-neutral-600/50 text-center">
                      {transaction.transactionId}
                    </td>
                    <td className="w-72 px-4 py-2 border border-neutral-600/50">
                      {itemData.name}
                    </td>
                    <td className="w-20 px-4 py-2 border border-neutral-600/50 text-center">
                      {transaction.quantity}
                    </td>
                    <td className="w-40 px-4 py-2 border border-neutral-600/50">
                      Rp. {transaction.total},-
                    </td>
                    <td className="w-40 px-4 py-2 border border-neutral-600/50">
                      {transaction.cashier}
                    </td>
                    <td className="w-60 px-4 py-2 border border-neutral-600/50">
                      {new Date(transaction.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
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
