"use client";

import {
  ClipboardText,
  ClockCounterClockwise,
  EggCrack,
  GearSix,
  HouseLine,
  ShoppingCartSimple,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: status } = useSession();
  const pathName = usePathname();

  return (
    <div className="w-14 flex flex-col items-center">
      <Image
        src={`/logo/150366.png`}
        width={100}
        height={100}
        className="w-7 h-7 mt-4 mb-2"
        alt="logo"
      />
      <Link
        href={"/s/"}
        className={
          pathName.endsWith("/s/")
            ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
            : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
        }
      >
        <HouseLine
          size={22}
          color="#737373"
          className={
            pathName.endsWith("/s/")
              ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
              : "group-hover:brightness-200 transition-all duration-300"
          }
        />
      </Link>
      <div className="w-8 border border-neutral-600/70 my-2"></div>

      <Link
        href={"/s/storage"}
        className={
          pathName.endsWith("/s/storage")
            ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
            : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
        }
      >
        <ClipboardText
          size={22}
          color="#737373"
          className={
            pathName.endsWith("/s/storage")
              ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
              : "group-hover:brightness-200 transition-all duration-300"
          }
        />
      </Link>
      <Link
        href={"/s/transaction"}
        className={
          pathName.endsWith("/s/transaction")
            ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
            : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
        }
      >
        <ShoppingCartSimple
          size={22}
          color="#737373"
          className={
            pathName.endsWith("/s/transaction")
              ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
              : "group-hover:brightness-200 transition-all duration-300"
          }
        />
      </Link>
      <Link
        href={"/s/transactions-history"}
        className={
          pathName.endsWith("/s/transactions-history")
            ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
            : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
        }
      >
        <ClockCounterClockwise
          size={22}
          color="#737373"
          className={
            pathName.endsWith("/s/transactions-history")
              ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
              : "group-hover:brightness-200 transition-all duration-300"
          }
        />
      </Link>
      <div className="w-8 border border-neutral-600/70 my-2"></div>
      <Link
        href={"/s/settings"}
        className={
          pathName.endsWith("/s/settings")
            ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
            : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
        }
      >
        <GearSix
          size={22}
          color="#737373"
          className={
            pathName.endsWith("/s/settings")
              ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
              : "group-hover:brightness-200 transition-all duration-300"
          }
        />
      </Link>
      {status ? (
        <Link
          href={"/s/logout"}
          className={
            pathName.endsWith("/s/logout")
              ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
              : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
          }
        >
          <SignOut
            size={22}
            color="#737373"
            className={
              pathName.endsWith("/s/logout")
                ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
                : "group-hover:brightness-200 transition-all duration-300"
            }
          />
        </Link>
      ) : (
        <Link
          href={"/login"}
          className={
            pathName.endsWith("/login")
              ? "p-3 m-2 bg-neutral-700 transition-all duration-300 rounded-lg group"
              : "p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
          }
        >
          <EggCrack
            size={22}
            color="#737373"
            className={
              pathName.endsWith("/login")
                ? "brightness-150 group-hover:brightness-200 transition-all duration-300"
                : "group-hover:brightness-200 transition-all duration-300"
            }
          />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
