"use client";

import Loading from "@/app/loading";
import GeneratePDF from "@/components/GeneratePDF";
import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const invoiceId = parseInt(id, 10);
  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/getInvoice/${invoiceId}`);
      if (response.ok) {
        const data = await response.json();
        setInvoice(data.body);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [invoiceId]);

  const formatedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} [${hours}:${minutes}:${seconds}]`;
  };

  return (
    <>
      <Header title={`INVOICE: INV${invoiceId}`} />
      {isLoading ? (
        <Loading />
      ) : (
        <GeneratePDF>
          {console.log(invoice)}
          <div className="bg-slate-100 text-neutral-950 w-[500px] mx-auto mt-12 text-sm uppercase font-mono">
            <div className="p-4 space-y-2">
              <div className="text-center max-w-96 mx-auto">
                <h1>WARKOP</h1>
                <h2>
                  RUKO ZAMRUD BLOK P 18 -40 RT.OO/RW.015 PADURENAN, MUSTIKAJAYA,
                  KOTA BEKASI, 17156
                </h2>
              </div>
              <div className="border-b border-neutral-950"></div>
              <div className="flex flex-row justify-between">
                <div className="text-left">
                  <h3>INV{invoice.id}</h3>
                  <h3>{formatedDate(invoice.createdAt)}</h3>
                </div>
                <div className="text-right">
                  <h3>Cashier: {invoice.cashier?.name}</h3>
                </div>
              </div>
              <div className="border-b border-neutral-950"></div>
              <div>
                <table className="w-full">
                  <tbody>
                    {invoice.menus?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">
                            {item.price?.toLocaleString()}
                          </td>
                          <td className="text-right">
                            {item.amount?.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="h-2" />
                    <tr className="border-t border-neutral-900"></tr>
                    <tr className="h-2" />
                    <tr key={`total`}>
                      <td className="text-right" colSpan={3}>
                        TOTAL:
                      </td>
                      <td className="text-right">
                        {invoice.totalAmount?.toLocaleString()}
                      </td>
                    </tr>
                    <tr key={`cash`}>
                      <td className="text-right" colSpan={3}>
                        CASH:
                      </td>
                      <td className="text-right">
                        {invoice.cash?.toLocaleString()}
                      </td>
                    </tr>
                    <tr key={`change`}>
                      <td className="text-right" colSpan={3}>
                        CHANGE:
                      </td>
                      <td className="text-right">
                        {invoice.change?.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center max-w-96 mx-auto pt-4">
                <h2>cust.care sms 085219489117 wa 081382009115</h2>
                <h2>
                  call 1500 280 - kontak@warkop.co.id
                </h2>
                <h2>
                  nongkrong? di warkop aja!
                </h2>
              </div>
            </div>
          </div>
        </GeneratePDF>
      )}
    </>
  );
};

export default Page;
