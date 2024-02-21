"use client";

import React, { Fragment } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Loading from "../loading";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import Modal from "@/components/Utilities/Modal";
import { Dialog, Transition } from "@headlessui/react";

const Page = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [tempTransactions, setTempTransactions] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [cash, setCash] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cashierData, setCashierData] = useState([]);
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false)

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getMenu");

      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }

      const res = await fetch(
        `/api/v1/getUserInfo/${session?.data?.user?.email}`
      );

      if (res.ok) {
        const data = await res.json();
        setCashierData(data.body);
      }

      setIsLoading(false);
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
      if (selectedQuantity > selectedItemData.stock) {
        alert("Quantity more than stock!");
      } else {
        const existingItemIndex = tempTransactions.findIndex(
          (item) => item.id === selectedItem
        );

        if (existingItemIndex !== -1) {
          alert("Menu already added to the transaction");
        } else {
          const itemName = selectedItemData.name;
          const itemPrice = selectedItemData.price;

          setTempTransactions([
            ...tempTransactions,
            {
              menuId: selectedItem,
              name: itemName,
              quantity: selectedQuantity,
              price: itemPrice,
              amount: selectedQuantity * itemPrice,
            },
          ]);

          setTotalPayment(totalPayment + selectedQuantity * itemPrice);
          setTotalItem(totalItem + selectedQuantity);

          setSelectedQuantity(0);
        }
      }
    }
  };

  const handleDelete = (index) => {
    const updatedTransactions = [...tempTransactions];
    const deletedItem = updatedTransactions.splice(index, 1)[0];
    setTempTransactions(updatedTransactions);
    setTotalPayment(totalPayment - deletedItem.total);
  };

  const pushTransactions = async () => {
    const transactionData = {
      cashierId: cashierData.id,
      totalAmount: totalPayment,
      cash,
      change: cash - totalPayment,
      menus: tempTransactions,
    };

    try {
      const response = await fetch("/api/v1/pushTransaction", {
        method: "POST",
        body: JSON.stringify(transactionData),
      });
    } catch (err) {
      console.error(err);
    }

    setTempTransactions([]);

    fetchData();
  };

  const plusHandle = (e) => {
    e.preventDefault();

    setSelectedQuantity(selectedQuantity + 1);
  };
  const minusHandle = (e) => {
    e.preventDefault();

    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="transaction">
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
                <h2 className="uppercase text-xs font-semibold">add item</h2>
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
                      primary25: "#10b981",
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
                    onChange={(event) => {
                      if (event.target.value >= 0) {
                        setSelectedQuantity(event.target.value);
                      }
                    }}
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
              <div className="w-full">
                <div className="h-[767px] overflow-y-auto">
                  <table className="text-left w-full h-max text-sm">
                    <thead className="sticky top-0 bg-neutral-900 border-b border-neutral-600/50">
                      <tr className="divide-x divide-neutral-600/50">
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
                        <th className="w-32 font-semibold px-4 py-2 whitespace-nowrap">
                          act
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
                            <td className="px-4 py-2 whitespace-nowrap w-80 border-t border-neutral-600/30">
                              {item.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap w-20 border-t border-neutral-600/30">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap w-28 border-t border-neutral-600/30">
                              {item.price}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap w-32 border-t border-neutral-600/30">
                              {item.amount}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap w-32 border-t border-neutral-600/30">
                              <button
                                onClick={() => handleDelete(index)}
                                className="p-2 bg-red-600/70 rounded-md"
                              >
                                <Trash
                                  size={18}
                                  color="#ecd9d9"
                                  weight="bold"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="total-panel fixed bottom-0 h-20 border-t border-neutral-600/80 bg-neutral-900 w-full pr-72">
                  <div className="w-full flex flex-col items-end">
                    <h3 className="w-full bg-gradient-to-r from-neutral-900 from-10% bg-emerald-700 text-right pr-8 font-extrabold text-white">
                      Total: Rp. {totalPayment.toLocaleString()},-
                    </h3>

                    <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={handleModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

                    {/* <Modal disable={false} text={`OPEN MODALL`}>
                      <div>
                        <table className="w-full text-sm">
                          <tbody className="">
                            {tempTransactions?.map((item, index) => {
                              return (
                                <tr key={index} className="">
                                  <td>{item.name}</td>
                                  <td>x{item.quantity}</td>
                                  <td>{item.price}</td>
                                  <td>{item.amount}</td>
                                </tr>
                              );
                            })}
                            <tr className="h-2" />
                            <tr className="border-t border-neutral-900"></tr>
                            <tr className="h-2" />
                            <tr className="">
                              <td>Total Item</td>
                              <td colSpan={2}>{totalItem}</td>
                              <td>{totalPayment}</td>
                            </tr>
                          </tbody>
                        </table>
                        <Modal text={`Confirm`} disable={false}>
                          <div className="text-neutral-900 border border-neutral-900 p-3">
                            <div className="bg-amber-300">
                              <div className="flex justify-between">
                                <h2>Total Payment:</h2>
                                <h2>Rp.{totalPayment}</h2>
                              </div>
                              <div className="flex justify-between">
                                <h2>Cash:</h2>
                                <input
                                  type="number"
                                  placeholder=""
                                  className="remove-arrow appearance-none rounded-md bg-white border border-neutral-900 py-2 px-4"
                                  value={cash}
                                  onChange={(event) => {
                                    if (event.target.value >= 0) {
                                      setCash(event.target.value);
                                    }
                                  }}
                                ></input>
                              </div>
                              <div className="flex justify-between">
                                <h2>Change:</h2>
                                <h2>Rp.{cash - totalPayment}</h2>
                              </div>
                              <button
                                onClick={pushTransactions}
                                className="font-bold"
                              >
                                Confirm Payment
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </Modal>

                    <Popup
                      trigger={<button className="button"> Open Modal </button>}
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal text-neutral-900 border border-neutral-900 p-3">
                          <div className="flex justify-between text-xs uppercase border-b border-neutral-900 mb-2 pb-2">
                            <h4>PAYMENT</h4>
                            <h4>Cashier: Wyvern</h4>
                          </div>

                          <table className="w-full text-sm">
                            <tbody className="">
                              {tempTransactions?.map((item, index) => {
                                return (
                                  <tr key={index} className="">
                                    <td>{item.name}</td>
                                    <td>x{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                  </tr>
                                );
                              })}
                              <tr className="h-2" />
                              <tr className="border-t border-neutral-900"></tr>
                              <tr className="h-2" />
                              <tr className="">
                                <td>Total Item</td>
                                <td colSpan={2}>{totalItem}</td>
                                <td>{totalPayment}</td>
                              </tr>
                            </tbody>
                          </table>

                          <Popup
                            trigger={
                              <button className="button">Confirm </button>
                            }
                            modal
                          >
                            {(close) => (
                              <div className="text-neutral-900 border border-neutral-900 p-3">
                                <div className="bg-amber-300">
                                  <div className="flex justify-between">
                                    <h2>Total Payment:</h2>
                                    <h2>Rp.{totalPayment}</h2>
                                  </div>
                                  <div className="flex justify-between">
                                    <h2>Cash:</h2>
                                    <input
                                      type="number"
                                      placeholder=""
                                      className="remove-arrow appearance-none rounded-md bg-white border border-neutral-900 py-2 px-4"
                                      value={cash}
                                      onChange={(event) => {
                                        if (event.target.value >= 0) {
                                          setCash(event.target.value);
                                        }
                                      }}
                                    ></input>
                                  </div>
                                  <div className="flex justify-between">
                                    <h2>Change:</h2>
                                    <h2>Rp.{cash - totalPayment}</h2>
                                  </div>
                                  <button
                                    onClick={pushTransactions}
                                    className="font-bold"
                                  >
                                    Confirm Payment
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                      )}
                    </Popup> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
