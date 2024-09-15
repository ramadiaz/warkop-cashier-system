"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useRef, useState } from "react";
import SmallLoading from "@/components/Utilities/SmallLoading";
import {
  ArrowsClockwise,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";

const Page = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState();
  const [stock, setStock] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshWidth = useRef(null);
  const tableWidth = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/v1/getMenu", {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      setMenuItems(data);
    }

    setIsLoading(false);
  };

  const filteredMenuItems = menuItems.body
    ?.filter((menuItem) => {
      return (
        menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menuItem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menuItem.stock.toString().includes(searchTerm) ||
        menuItem.price.toString().includes(searchTerm)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleAddMenu = async (event) => {
    event.preventDefault();

    if (!name || !price || !type || !stock) {
      alert("Please fill in all required fields");
      return;
    } else {
      const data = {
        name,
        type,
        price: parseInt(price, 10),
        stock: parseInt(stock, 10),
      };

      const response = await fetch("/api/menu/register", {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-store",
      });

      if (response.ok) {
        fetchData();
        alert("Add new item success");
        setName("");
        setPrice("");
        setType();
        setStock();
      } else {
        alert("Add new item failed");
      }
    }
  };

  const handleDeleteMenu = async (id) => {
    const response = await fetch("/api/v1/deleteMenu", {
      method: "DELETE",
      body: id,
      cache: "no-store",
    });

    if (response.ok) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const tableW = tableWidth.current?.offsetWidth;

    refreshWidth.current.style.width = `${tableW}px`;
  });

  return (
    <div className="storage-new overflow-hidden">
      <Header title={`Storage`} />
      <div className="flex">
        <div className="new-menu border-r border-neutral-600/50 min-w-60 max-w-60">
          <div className="p-4">
            <h2 className="uppercase text-xs font-semibold">
              Register new item
            </h2>
            <form onSubmit={handleAddMenu} className="py-2 flex flex-col gap-2">
              <input
                type="text"
                placeholder="New item name"
                className="rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:border-neutral-600"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></input>
              <input
                type="number"
                placeholder="Price"
                className="remove-arrow appearance-none rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:ring-neutral-600"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></input>
              <select
                className="rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:border-neutral-600"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value={null}>Type</option>
                <option value="Food">Food</option>
                <option value="Drink">Drink</option>
                <option value="Snack">Snack</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Stock total"
                className="remove-arrow appearance-none rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:ring-neutral-600"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              ></input>
              <button
                type="submit"
                className="rounded-md py-1 text-white text-xs font-bold uppercase w-full bg-emerald-500/70 hover:bg-emerald-500 border border-lime-300 focus:border-neutral-600 transition-all duration-300"
              >
                Add new item
              </button>
            </form>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <div
            ref={refreshWidth}
            className="h-12 flex items-center bg-neutral-800/30 bg-gradient-to-l from-neutral-900 from-10% gap-4"
          >
            <button
              onClick={fetchData}
              className="ml-2 px-2 py-1 bg-neutral-700/90 rounded-md text-xs flex gap-2"
            >
              <ArrowsClockwise size={17} color="#737373" />
              Refresh
            </button>
            <div className="relative flex justify-end items-center">
              <input
                type="text"
                placeholder="Search"
                className="rounded-md px-3 py-1 text-xs w-48 bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:ring-neutral-600"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div className="absolute pr-2">
                <MagnifyingGlass size={13} color="#737373" />
              </div>
            </div>
          </div>
          <div className="h-[802px] w-full">
            {isLoading ? (
              <SmallLoading />
            ) : (
              <table
                ref={tableWidth}
                className="w-max h-max text-sm text-neutral-200 text-left border-r border-b border-neutral-600/50"
              >
                <thead className="bg-neutral-800 sticky top-0">
                  <tr className="divide-x divide-neutral-600/50">
                    <th
                      scope="col"
                      className="font-semibold px-4 py-2 w-16 whitespace-nowrap"
                    >
                      no.
                    </th>
                    <th
                      scope="col"
                      className="font-semibold px-4 py-2 w-96 whitespace-nowrap"
                    >
                      item name
                    </th>
                    <th
                      scope="col"
                      className="font-semibold px-4 py-2 w-20 whitespace-nowrap"
                    >
                      type
                    </th>
                    <th
                      scope="col"
                      className="font-semibold px-4 py-2 w-20 whitespace-nowrap"
                    >
                      stock
                    </th>
                    <th
                      scope="col"
                      className="font-semibold px-4 py-2 w-28 whitespace-nowrap"
                    >
                      price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-600/50">
                  {filteredMenuItems?.map((menuItem, index) => {
                    return (
                      <tr
                        key={index}
                        className="divide-x divide-neutral-600/50"
                      >
                        <th className="font-normal px-4 py-2 w-16 whitespace-nowrap">
                          {index + 1}
                        </th>
                        <td className="font-normal px-4 py-2 w-96 whitespace-nowrap">
                          {menuItem.name}
                        </td>
                        <td className="font-normal px-4 py-2 w-20 whitespace-nowrap">
                          {menuItem.type}
                        </td>
                        <td className="font-normal px-4 py-2 w-20 whitespace-nowrap">
                          {menuItem.stock.toLocaleString()}
                        </td>
                        <td className="font-normal px-4 py-1 w-28 whitespace-nowrap">
                          Rp. {menuItem.price.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
