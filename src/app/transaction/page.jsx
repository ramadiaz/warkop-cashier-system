"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Loading from "../loading";

const Page = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [tempTransactions, setTempTransactions] = useState([]);
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

  const options = menuItems.body?.map(
    (item) =>
      ({
        value: item.id,
        label: item.name,
      }) || []
  );

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
    }
  };

  const pushTransactions = () => {
    tempTransactions.map(async(transaction) => {
      const data = {
        menuId: transaction.id,
        quantity: parseInt(transaction.quantity, 10),
        total: parseInt(transaction.total, 10)
      }
      const response = await fetch("/api/v1/pushTransaction", {
        method: "POST",
        body: JSON.stringify(data),
      });
    })
  }

  return (
    <div className="transaction ">
      <div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
        <Header title={`Transaction`} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex-grow flex flex-row">
              <form
                onSubmit={handleAddItem}
                className="min-w-60 max-w-60 border-r border-neutral-600/50 flex-grow flex flex-col p-4"
              >
                <h2 className="uppercase text-xs font-semibold">add item</h2>
                <ReactSelect
                  options={options}
                  className="text-neutral-800"
                  value={options.find(
                    (option) => option.value === selectedItem
                  )}
                  onChange={(selectedOption) =>
                    setSelectedItem(selectedOption?.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="rounded-md px-3 py-1 text-xs w-full bg-neutral-800/80 placeholder:text-neutral-300/80 border border-neutral-600/50 focus:ring-neutral-600"
                  value={selectedQuantity}
                  onChange={(event) => setSelectedQuantity(event.target.value)}
                ></input>
                <button
                  type="submit"
                  className="rounded-md py-1 text-white text-xs font-bold uppercase w-full bg-emerald-500/70 hover:bg-emerald-500 border border-lime-300 focus:border-neutral-600 transition-all duration-300"
                >
                  Add new item
                </button>
              </form>
              <table className="w-full items-start text-left">
                <thead>
                  <tr>
                    <th className="w-80 font-semibold px-4 py-2 whitespace-nowrap">
                      Name
                    </th>
                    <th className="w-20 font-semibold px-4 py-2 whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="w-28 font-semibold px-4 py-2 whitespace-nowrap">
                      Price @item
                    </th>
                    <th className="w-auto font-semibold px-4 py-2 whitespace-nowrap">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tempTransactions?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.name}</th>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="total-panel h-14 bg-emerald-500 bg-gradient-to-r from-neutral-900 from-10%">
              <button onClick={pushTransactions}>Submit to database</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
