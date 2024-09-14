"use client";

import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const GetUserData = () => {
  const token = Cookies.get("token");
  const data = decodeJwt(token);

  return data;
};

export { GetUserData };
