"use client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    contact: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Successfully register", {
          description: "Verification email will be sent soon",
        });
        router.push("/login");
      } else {
        const data = await res.json();
        toast.error("Register failed", {
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
      <div className="relative w-[600px] grid place-items-center">
        <img src="/loginsrc/sofa.gif" className="absolute rounded-2xl" />
      </div>

      <div className="flex flex-col gap-y-7 w-[300px]">
        <h2 className="text-2xl font-semibold">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-3">
          <div className="flex flex-row gap-2 items-center w-full">
            <input
              type="text"
              className="text-sm p-2 rounded-2xl outline-none tracking-widest w-1/2"
              name="fullname"
              placeholder="First Name"
              value={data.first_name}
              onChange={(e) => {
                setData({ ...data, first_name: e.target.value });
              }}
            />
            <input
              type="text"
              className="text-sm p-2 rounded-2xl outline-none tracking-widest w-1/2"
              name="fullname"
              placeholder="Last Name"
              value={data.last_name}
              onChange={(e) => {
                setData({ ...data, last_name: e.target.value });
              }}
            />
          </div>

          <input
            type="username"
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
            name="username"
            placeholder="username"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
          />
          <input
            type="email"
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />

          <input
            type="text"
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
            name="contact"
            placeholder="Contact"
            value={data.contact}
            onChange={(e) => {
              setData({ ...data, contact: e.target.value });
            }}
          />

          <input
            type="text"
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
            }}
          />

          <input
            type="password"
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />

          <button
            type="submit"
            disabled={data.username == "" || data.password == "" || isLoading}
            className={`bg-neutral-700/40 tracking-wider p-2 rounded-2xl transition flex flex-row items-center justify-center ${data.username == "" || data.password == "" || isLoading ? "opacity-50" : "hover:bg-neutral-700 "}`}
          >
            <Loader2
              className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
            />
            Register
          </button>
        </form>

        <div className="text-center text-sm text-grey-dark">
          By Signing up, You Agree to The{" "}
          <a
            className="no-underline border-b border-grey-dark text-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
            href="#"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="no-underline border-b border-grey-dark text-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
            href="#"
          >
            Privacy Policy
          </a>
        </div>

        <span className="border-t-2 w-full text-center"></span>

        <div className="text-grey-dark text-center">
          Already Have an Account?{" "}
          <a
            className="no-underline border-b border-blue text-blue hover:border-green-400 hover:text-green-400 transition-all duration-300"
            href="../login/"
          >
            Log in.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
