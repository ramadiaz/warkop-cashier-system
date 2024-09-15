"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/s");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <Loading />;
};

export default Page;
