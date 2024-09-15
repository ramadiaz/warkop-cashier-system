"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/request-reset?un=${username}`, {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setIsSent(true);
        toast.success("OTP Code sent to your email!", {
          description: "Please check your email to verify",
        });
        router.push(`/forgot-password/verify?token=${data.body}`);
      } else {
        toast.error("Failed to send", {
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
    <div className="w-full dark h-screen flex flex-col justify-center items-center gap-3">
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          disabled={isLoading || isSent}
          className="text-sm p-2 rounded-2xl outline-none tracking-widest"
        />
        <button
          disabled={username == "" || isLoading || isSent}
          className={`bg-neutral-700/40 tracking-wider min-w-20 p-2 rounded-2xl transition flex flex-row items-center justify-center ${username == "" || isLoading || isSent ? "opacity-50" : "hover:bg-neutral-700 "}`}
          onClick={handleSend}
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
          />
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
