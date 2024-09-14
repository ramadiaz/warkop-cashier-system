"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import userAuth from "./userAuth";

const Layout = ({ children }) => {
  const { push } = useRouter();
  const token = Cookies.get("token");

  if (!token) {
    push("/login");
    return;
  }

  return children;
};

export default userAuth(Layout);
