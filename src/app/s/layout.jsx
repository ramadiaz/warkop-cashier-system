"use client";

import Cookies from "js-cookie";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import userAuth from "./userAuth";

const Layout = ({ children }) => {
  const { push } = useRouter();
  const token = Cookies.get("token");
  const pathName = usePathname();

  if (!token) {
    push("/login");
    return;
  }

  return (
    <div className="bg-white text-black min-h-[calc(100vh_-_20px)] flex flex-col">
      <div
        className={`sticky top-0 ${
          pathName.endsWith("/admin")
            ? "bg-neutral-900 text-white"
            : "bg-white text-black"
        } z-40`}
      >
        <HeadBar />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default userAuth(Layout);
