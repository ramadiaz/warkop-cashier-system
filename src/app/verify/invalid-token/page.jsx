import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <div className="text-5xl font-semibold">
        Invalid <span className="text-rose-400">Token!</span>
      </div>
      <div>
        Your token may be invalid or you might already have a new one. You can
        generate a new token {" "}
        <Link
          href={`/verify/resend`}
          className="underline hover:text-emerald-400"
        >
          here
        </Link>
        .
      </div>
    </div>
  );
};

export default Page;
