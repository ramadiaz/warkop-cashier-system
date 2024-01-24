"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Loading from "../loading";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";

const Page = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [tempTransactions, setTempTransactions] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/readMenu");
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = menuItems.body
    ?.map(
      (item) =>
        ({
          value: item.id,
          label: item.name,
        }) || []
    )
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleAddItem = (event) => {
    event.preventDefault();

    const selectedItemData = menuItems.body.find(
      (item) => item.id === selectedItem
    );

    if (!selectedItem || !selectedQuantity || !selectedItemData) {
      alert("Please fill in all required fields");
      return;
    } else {
      const itemName = selectedItemData.name;
      const itemPrice = selectedItemData.price;

      setTempTransactions([
        ...tempTransactions,
        {
          id: selectedItem,
          name: itemName,
          quantity: selectedQuantity,
          price: itemPrice,
          total: selectedQuantity * itemPrice,
        },
      ]);

      setTotalPayment(totalPayment + selectedQuantity * itemPrice)

      setSelectedItem("Selece...")
      setSelectedQuantity(0)
    }
  };

  const pushTransactions = () => {
    tempTransactions.map(async (transaction) => {
      const data = {
        menuId: transaction.id,
        quantity: parseInt(transaction.quantity, 10),
        total: parseInt(transaction.total, 10),
      };
      const response = await fetch("/api/v1/pushTransaction", {
        method: "POST",
        body: JSON.stringify(data),
      });
    });

    setTempTransactions([])
  };

  const plusHandle = (e) => {
    e.preventDefault()

    setSelectedQuantity(selectedQuantity + 1)
  }
  const minusHandle = (e) => {
    e.preventDefault()

    setSelectedQuantity(selectedQuantity - 1)
  }

  return (
    <div className="transaction ">
      <div className="flex flex-col min-h-screen max-h-screen">
        <Header title={`Transaction`} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-row flex-grow">
              <form
                onSubmit={handleAddItem}
                className="min-w-60 max-w-60 border-r border-neutral-600/50 flex-grow flex flex-col p-4 gap-2"
              >
                <h2 className="uppercase text-xs font-semibold">
                  add item
                </h2>
                <ReactSelect
                  options={options}
                  className="text-neutral-800"
                  value={options?.find(
                    (option) => option.value === selectedItem
                  )}
                  onChange={(selectedOption) =>
                    setSelectedItem(selectedOption?.value)
                  }
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "hotpink",
                      primary: "black",
                    },
                  })}
                />

                <div className="flex flex-row gap-2">
                  <button onClick={plusHandle}>
                    <Plus size={28} color="#737373" />
                  </button>
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="remove-arrow appearance-none rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:ring-neutral-600"
                    value={selectedQuantity}
                    onChange={(event) =>
                      setSelectedQuantity(event.target.value)
                    }
                  ></input>
                  <button onClick={minusHandle}>
                    <Minus size={28} color="#737373" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-md py-1 text-white text-xs font-bold uppercase w-full bg-emerald-500/70 hover:bg-emerald-500 border border-lime-300 focus:border-neutral-600 transition-all duration-300"
                >
                  Add new item
                </button>
              </form>

              <table className="text-left w-max h-max text-sm">
                <thead>
                  <tr className="divide-x divide-neutral-600/50 border-b border-neutral-600/50">
                    <th className="w-80 font-semibold px-4 py-2 whitespace-nowrap">
                      name
                    </th>
                    <th className="w-20 font-semibold px-4 py-2 whitespace-nowrap">
                      quantity
                    </th>
                    <th className="w-28 font-semibold px-4 py-2 whitespace-nowrap">
                      @price
                    </th>
                    <th className="w-32 font-semibold px-4 py-2 whitespace-nowrap">
                      total
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {tempTransactions?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="divide-x divide-neutral-600/50"
                      >
                        <td className="px-4 py-2 whitespace-nowrap w-80">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap w-20">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap w-28">
                          {item.price}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap w-32">
                          {item.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="total-panel fixed bottom-0 w-full h-20 border-t border-neutral-600/80 bg-neutral-900">
              <h3>Total: {totalPayment}</h3>
              <button onClick={pushTransactions}>Submit to database</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
