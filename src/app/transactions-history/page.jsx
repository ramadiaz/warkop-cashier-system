"use client"

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import Loading from "../loading";

const Page = () => {
    const [transactions, setTransactions] = useState([])
    const [menus, setMenus] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async() => {
      setIsLoading(true);
      const response = await fetch("/api/v1/getTransactions");
  
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }

      const menu = await fetch("/api/v1/getMenu")

      if (menu.ok) {
        const data = await menu.json();
        setMenus(data);
      }
  
      setIsLoading(false);
    }

    useEffect(() => {
      fetchData();
    }, [])

  return (
    <div className="transactions-history h-screen">
      <Header title={`Transactions History`} />
      {isLoading ? (<Loading/>) : (
        <div className="h-full ">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>item</th>
                <th>quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.body?.map((transaction) => {
                const itemData = menus.body.find(
                  (item) => item.id === transaction.menuId
                );

                return (
                  <tr>
                    <td>{transaction.createdAt}</td>
                    <td>{itemData.name}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.total}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
          )}
          </div>
  );
};

export default Page;
