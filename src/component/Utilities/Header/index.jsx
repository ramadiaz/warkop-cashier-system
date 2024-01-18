import Link from "next/link";

const Header = ({ title, desc, linkHref, linkTitle }) => {
  return (
    <div className="flex justify-between items-center pt-12 pb-7 mx-auto w-11/12 lg:w-2/3">
      <div>
        <h1 className="text-2xl text-slate-100 font-bold">{title}</h1>
        <h3 className="text-slate-orange06/70">{desc}</h3>
        </div>

      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="whitespace-nowrap text-lg text-orange-600 hover:text-slate-100 transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};
export default Header;