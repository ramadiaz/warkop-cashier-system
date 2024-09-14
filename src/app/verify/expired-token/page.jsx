import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <div className="text-5xl font-semibold">
        Expired <span className="text-rose-400">Token!</span>
      </div>
      <div>
        Your token has expired. You can request a new one{" "}
        <Link
          href={`/verify/resend`}
          className="underline hover:text-emerald-400"
        >
          here
        </Link>.
      </div>
    </div>
  );
};

export default Page;
