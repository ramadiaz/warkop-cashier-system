"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  const [cashierData, setCashierData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `/api/v1/getUserInfo/${session?.data?.user?.email}`
      );

      if (res.ok) {
        const data = await res.json();
        setCashierData(data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(cashierData);

  return (
    <div>
      <Header title={`Transaction History`} />
      {isLoading ? "Loading" : <h3>{cashierData.body?.name}</h3>}
    </div>
  );
};

export default Page;
