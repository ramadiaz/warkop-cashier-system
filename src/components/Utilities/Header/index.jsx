import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

const Header = ({ title }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut();
    }
  }, [status]);

  return (
    <div className="w-full border-b border-neutral-600/50 flex justify-between items-center">
      <h1 className="py-4 px-4 text-xl font-semibold">{title}</h1>
      <div className="flex flex-row">
        <div className="text-right">
          <h3 className="px-4 text-lg font-semibold">{session?.user?.name || "unauthorized"}</h3>
          <h4 className="px-4 text-xs ">Login as {session?.user?.role || "unknown"}</h4>
        </div>
        <Image src={"/img/avatar.png"} alt="Avatar" width={400} height={400} className="w-12 rounded-full mr-4 scale-90"/>
      </div>
    </div>
  );
};

export default Header;