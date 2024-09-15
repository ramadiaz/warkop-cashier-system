"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/verify-reset", {
        method: "POST",
        body: JSON.stringify({
          id: token,
          otp: otp,
        }),
      });

      const res_data = await res.json();

      if (res.ok) {
        toast.success("OTP Verified", {
          description: "Redirecting...",
        });
        router.push(`/forgot-password/reset?token=${res_data.body}`);
      } else if (res.status == 404) {
        toast.error("Invalid Token", {
          description: "Redirecting...",
        });
        router.push(`/forgot-password`);
      } else {
        toast.error(res_data.error, {
          description: "Your OTP is invalid or expired",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full dark h-screen flex justify-center items-center">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="text-5xl font-bold">OTP Verification!</h1>
        <h2 className="text-lg">
          Please check your email to get your OTP Verification Code.
        </h2>
        <div className="h-16" />
        <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-neutral-300" />
            <InputOTPSlot index={1} className="border-neutral-300" />
            <InputOTPSlot index={2} className="border-neutral-300" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="border-neutral-300" />
            <InputOTPSlot index={4} className="border-neutral-300" />
            <InputOTPSlot index={5} className="border-neutral-300" />
          </InputOTPGroup>
        </InputOTP>
        <div className="h-16" />
        <button
          type="submit"
          disabled={otp.length < 6 || isLoading}
          className={`bg-neutral-700/40 tracking-wider w-full p-2 rounded-2xl transition flex flex-row items-center justify-center ${otp.length < 6 || isLoading ? "opacity-50" : "hover:bg-neutral-700 "}`}
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
          />
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;
