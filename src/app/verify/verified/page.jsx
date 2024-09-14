"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [count, setCount] = useState(7);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(interval);
          router.push("/login");
          return prevCount;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <div className="text-5xl font-semibold">
        Email <span className="text-emerald-400">verified!</span>
      </div>
      <div>Redirecting into login in {count}</div>
    </div>
  );
};

export default Page;
