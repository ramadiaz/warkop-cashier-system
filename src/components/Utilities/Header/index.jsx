import Image from "next/image";

const Header = ({ title }) => {
  return (
    <div className="w-full border-b border-neutral-600/50 flex justify-between items-center">
      <h1 className="py-4 px-4 text-xl font-semibold">{title}</h1>
      <div className="flex flex-row">
        <div className="text-right">
          <h3 className="px-4 text-lg font-semibold">Wyvern</h3>
          <h4 className="px-4 text-xs ">Login as Cashier</h4>
        </div>
        <Image src={"/img/avatar.png"} alt="Avatar" width={400} height={400} className="w-12 rounded-full mr-4 scale-90"/>
      </div>
    </div>
  );
};

export default Header;
