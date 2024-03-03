"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      callbackUrl: '/',
    });
  };

  return (
    <div
      className="h-screen flex justify-center items-center gap-x-7 mx-6"
      id="loginPage"
    >
      {/* Begin of Login */}
      <div className="flex flex-col gap-y-7 w-[300px]">
        {/* Begin of Heading */}
        <h2 className="text-2xl font-semibold">Login</h2>
        {/* End of Heading */}

        {/* Begin of Login Form */}
        <form onSubmit={loginUser} className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
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
            className="bg-neutral-700/40 tracking-wider p-2 rounded-2xl hover:bg-neutral-700 transition"
          >
            Login
          </button>
        </form>
        {/* End of Login Form  */}
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

        {/* Begin of Register */}
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
        {/* End of Register */}
      </div>
      {/* End of Login */}

      {/* Begin of Image */}
      <div className="relative w-[600px] grid place-items-center">
        <img src="/loginsrc/sofa.gif" className="absolute rounded-2xl" />
      </div>
      {/* End of Image */}
    </div>
  );
};

export default LoginPage;
