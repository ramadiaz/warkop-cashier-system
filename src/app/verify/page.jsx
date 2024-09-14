"use client";

import { useEffect } from "react";
import Loading from "../loading";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const res = await fetch(`/api/verify?token=${token}`, {
        method: "POST",
      });

      if (res.status == 404) {
        router.push("/verify/invalid-token");
      } else if (res.status == 410) {
        router.push("/verify/token-expired");
      } else if (res.status == 200) {
        router.push("/verify/verified");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return <Loading />;
};

export default Page;
