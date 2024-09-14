"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import fetchWithAuth from "@/utilities/fetchWithAuth";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API_URL;

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const res = await fetchWithAuth(BASE_API + "/user/login", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("success login");
      } else {
        console.log({ res });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center gap-x-7 mx-6"
      id="loginPage"
    >
      <div className="flex flex-col gap-y-7 w-[300px]">
        <h2 className="text-2xl font-semibold">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
          />
          <button
            type="submit"
            disabled={data.username === "" || data.password === ""}
            className="bg-neutral-700/40 tracking-wider p-2 rounded-2xl hover:bg-neutral-700 transition"
          >
            Login
          </button>
        </form>
        <div className="w-full text-end">
          <Link
            href="/"
            className="text-xs font-semibold no-underline w-max
          border-b border-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
          >
            Forgot my Password
          </Link>
        </div>

        <span className="border-t-2 w-full text-center"></span>
        <div className="flex flex-col item-start gap-y-3 ">
          <p className="text-sm text-center">
            If you don't have an account, please register.
          </p>
          <button
            onClick={(e) => {
              router.push("/register");
            }}
            className="bg-neutral-700/40 hover:bg-neutral-700 transition px-4 py-1 rounded-2xl text-sm 
            tracking-wider"
          >
            Register
          </button>
        </div>
      </div>
      <div className="relative w-[600px] grid place-items-center">
        <img src="/loginsrc/sofa.gif" className="absolute rounded-2xl" />
      </div>
    </div>
  );
};

export default LoginPage;
