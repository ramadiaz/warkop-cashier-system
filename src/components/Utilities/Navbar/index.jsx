import {
  ClipboardText,
  GearSix,
  HouseLine,
  ShoppingCartSimple,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-14 flex flex-col items-center">
      <Image
        src={`/logo/150366.png`}
        width={100}
        height={100}
        className="w-7 h-7 mt-4 mb-2"
      />
      <Link
        href={"/"}
        className="p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
      >
        <HouseLine
          size={22}
          color="#737373"
          className="group-hover:brightness-200 transition-all duration-300"
        />
      </Link>
      <div className="w-8 border border-neutral-600/70 my-2"></div>
      <Link
        href={"/storage-new"}
        className="p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
      >
        <ClipboardText
          size={22}
          color="#737373"
          className="group-hover:brightness-200 transition-all duration-300"
        />
      </Link>
      <Link
        href={"/transaction"}
        className="p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
      >
        <ShoppingCartSimple
          size={22}
          color="#737373"
          className="group-hover:brightness-200 transition-all duration-300"
        />
      </Link>
      <div className="w-8 border border-neutral-600/70 my-2"></div>
      <Link
        href={"/settings"}
        className="p-3 m-2 hover:bg-neutral-700 transition-all duration-300 rounded-lg group"
      >
        <GearSix
          size={22}
          color="#737373"
          className="group-hover:brightness-200 transition-all duration-300"
        />
      </Link>
    </div>
  );
};

export default Navbar;
