"use client";

import Loading from "@/app/loading";
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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setInvoice(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [invoiceId]);

  return (
    <>
    <Header title={`INVOICE: INV${invoiceId}`}/>
    {isLoading ? (
        <Loading/>
    ):(
        "fetcheed"
    )}
    </>
  )
};

export default Page;
