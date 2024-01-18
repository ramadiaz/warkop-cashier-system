"use client";

import Header from "@/component/Utilities/Header";
import { useEffect, useState } from "react";

const Page = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/v1/readMenu");

    if (response.ok) {
      const data = await response.json();
      setMenuItems(data);
    }

    setIsLoading(false);
  };

  const handleAddMenu = async (event) => {
    event.preventDefault();

    const data = { name, price: parseInt(price, 10) };

    const response = await fetch("/api/v1/addMenu", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setName('')
    setPrice('')

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="menu-list pt-14">
      <Header title={`Daftar Menu`} desc={`Menu yang tersedia di Warkop`} />
      <div className="mx-auto w-11/12 lg:w-2/3 py-14">
        <form
          onSubmit={handleAddMenu}
          className="w-full bg-slate-700/90 p-4 rounded-lg"
        >
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="nama-menu"
              >
                Nama menu
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nama-menu"
                type="text"
                placeholder="Ex: Indomie"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="harga-menu"
              >
                Harga
              </label>
              <input
                className="remove-arrow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="harga-menu"
                type="number"
                placeholder="Ex: 9000"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 mx-3 bg-orange-600 rounded-md mt-2 uppercase font-bold text-sm"
              type="submit"
            >
              Tambah
            </button>
          </div>
        </form>
        <div className="w-full rounded-lg mt-8">
          {isLoading ? (
            "Loading"
          ) : (
            <table className="w-full text-left rounded-lg overflow-hidden">
              <thead className="text-sm uppercase bg-slate-700/90">
                <tr className="">
                  <th className="w-3/4 px-4 py-5">Nama menu</th>
                  <th className="w-1/4 px-4 py-5">Harga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/20">
                {menuItems.body?.map((menuItem, index) => {
                  return (
                    <tr key={index} className="even:bg-slate-700/50">
                      <th className="w-3/4 px-4 py-3 font-normal">{menuItem.name}</th>
                      <td className="w-1/4 px-4 py-3">Rp. {menuItem.price.toLocaleString()},-</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
