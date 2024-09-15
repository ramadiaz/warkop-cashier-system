"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/reset-password?token=${token}`, {
        method: "POST",
        body: JSON.stringify({
          password: password,
        }),
      });
      if (res.ok) {
        toast.success("Password successfully reset", {
          description: "Redirecting...",
        });
        router.push(`/login`);
      } else if (res.status == 401) {
        toast.error("Invalid Token", {
          description: "Redirecting...",
        });
        router.push(`/forgot-password`);
      } else {
        toast.error(res_data.error, {
          description: "Something wrong",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 min-w-72"
      >
        <h1 className="text-5xl font-bold">Password Reset</h1>
        <h2 className="text-lg"></h2>
        <div className="h-16" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          disabled={isLoading}
          className="text-sm p-2 rounded-2xl outline-none tracking-widest w-full border border-transparent"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          disabled={isLoading}
          className={`text-sm p-2 rounded-2xl outline-none tracking-widest w-full border ${password != confirmPassword && password != "" ? "border-red-500" : "border-transparent"}`}
        />
        <h4
          className={
            password != confirmPassword && password != ""
              ? "block text-sm text-red-500 italic"
              : "hidden"
          }
        >
          Passwords do not match
        </h4>
        <button
          disabled={
            password == "" ||
            confirmPassword == "" ||
            password != confirmPassword
          }
          className={`bg-neutral-700/40 tracking-wider min-w-20 p-2 rounded-2xl transition flex flex-row items-center justify-center w-full ${
            password == "" ||
            confirmPassword == "" ||
            password != confirmPassword ||
            isLoading
              ? "opacity-50"
              : "hover:bg-neutral-700 "
          }`}
          type="submit"
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
          />
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Page;
