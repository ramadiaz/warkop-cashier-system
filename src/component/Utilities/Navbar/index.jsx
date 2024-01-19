import {
  ForkKnife,
  GearSix,
  House,
  ShoppingCartSimple,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-col mt-8">
      <div className="py-3 border-b border-gray-400/50">
        <Link href={`/`}>
          <House size={28} color="#737373" />
        </Link>
      </div>
      <div className="py-3">
        <Link href={`/menu-list`}>
          <ForkKnife size={28} color="#737373" />
        </Link>
      </div>
      <div className="py-3">
        <Link href={`/`}>
          <ShoppingCartSimple size={28} color="#737373" />
        </Link>
      </div>
      <div className="py-3">
        <Link href={`/`}>
          <GearSix size={28} color="#737373" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
