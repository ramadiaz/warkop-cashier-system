"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import Loading from "../loading";

const Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsMenu, setTransactionsMenu] = useState([]);
  const [cashierData, setCashierData] = useState([]);
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

    const response2 = await fetch("/api/v1/getTransactionsMenu");

    if (response2.ok) {
      const data = await response2.json();
      setTransactionsMenu(data);
    }

    const cashier = await fetch("/api/v1/getCashier");

    if (cashier.ok) {
      const data = await cashier.json();
      setCashierData(data);
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
            
          </table>
          {/* {new Date(transaction.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })} */}
        </div>
      )}
    </div>
  );
};

export default Page;
