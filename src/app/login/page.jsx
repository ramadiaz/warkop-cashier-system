"use client";

import { toast } from "sonner";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Successfully Login", {
          description: "Redirecting...",
        });
        router.push("/");
      } else {
        const data = await res.json();
        toast.error("Login failed", {
          description: data.error,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
            disabled={data.username == "" || data.password == "" || isLoading}
            className={`bg-neutral-700/40 tracking-wider p-2 rounded-2xl transition flex flex-row items-center justify-center ${data.username == "" || data.password == "" || isLoading ? "opacity-80" : "hover:bg-neutral-700 "}`}
          >
            <Loader2
              className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
            />
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
