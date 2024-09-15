"use client";

import React, { Fragment } from "react";
import "reactjs-popup/dist/index.css";
import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import ButtonSpinner from "@/components/Utilities/ButtonSpinner";
import Loading from "@/app/loading";
import { GetUserData } from "@/utilities/GetUserData";

const Page = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [tempTransactions, setTempTransactions] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [cash, setCash] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [isPaymentAllowed, setIsPaymenAllowed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [lastTransactionID, setLastTransactionID] = useState(0);

  const user_data = GetUserData();

  const { push } = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/menu/getall", {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
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

  useEffect(() => {
    setIsPaymenAllowed(tempTransactions.length > 0);
  }, [tempTransactions]);

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
              menu_id: selectedItem,
              name: itemName,
              quantity: selectedQuantity,
              price: itemPrice,
              amount: selectedQuantity * itemPrice,
            },
          ]);

          setTotalPayment(totalPayment + selectedQuantity * itemPrice);
          setTotalItem(totalItem + selectedQuantity);

          setSelectedQuantity(0);
          setIsPaymenAllowed(true);
        }
      }
    }
  };

  const handleDelete = (index) => {
    const updatedTransactions = [...tempTransactions];
    const deletedItem = updatedTransactions.splice(index, 1)[0];
    setTempTransactions(updatedTransactions);
    setTotalPayment(totalPayment - deletedItem.amount);
    setTotalItem(totalItem - deletedItem.quantity);
  };

  const pushTransactions = async () => {
    setIsTransactionLoading(true);
    if (!user_data) {
      setIsSuccess(false);
      setIsTransactionLoading(false);
      return null;
    }
    const transactionData = {
      cashier_id: user_data.id,
      total: totalPayment,
      cash,
      change: cash - totalPayment,
      menus: tempTransactions,
    };

    try {
      const response = await fetch("/api/transaction/register", {
        method: "POST",
        body: JSON.stringify(transactionData),
        cache: "no-store",
      });

      if (response.ok) {
        setIsTransactionLoading(false);
        setIsSuccess(true);
        setTempTransactions([]);
        setTotalPayment(0);
        setTotalItem(0);
        setCash(0);

        const data = await response.json();
        setLastTransactionID(data.body.id);
      } else {
        setIsTransactionLoading(false);
        setIsSuccess(false);
        console.error("Failed to push transaction:", response.status);
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setIsTransactionLoading(false);
    }
    setIsTransactionLoading(false);
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

  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };
  const handlePaymentModal = () => {
    setPaymentModal(!paymentModal);
  };
  const handleInvoiceModal = () => {
    setInvoiceModal(!invoiceModal);
  };

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
                  <div className="w-full flex flex-col items-end h-full">
                    <h3 className="w-full bg-gradient-to-r from-neutral-900 from-10% bg-emerald-700 text-right pr-6 font-extrabold text-white">
                      Total: Rp. {totalPayment.toLocaleString()},-
                    </h3>

                    <div className="mr-4 h-full">
                      <button
                        type="button"
                        onClick={handleConfirmationModal}
                        disabled={!isPaymentAllowed}
                        className={`font-semibold uppercase px-4 py-2 h-full transition-all duration-300 ${isPaymentAllowed ? "hover:text-emerald-500" : "opacity-90"}`}
                      >
                        Confirm Payment
                      </button>
                    </div>

                    <Transition appear show={confirmationModal} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={handleConfirmationModal}
                      >
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
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-neutral-900"
                                >
                                  Transaction confirmation
                                </Dialog.Title>
                                <div className="mt-2 text-neutral-900">
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
                                </div>

                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-500/70 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300"
                                    onClick={() => {
                                      handlePaymentModal();
                                      handleConfirmationModal();
                                    }}
                                  >
                                    Continue Payment
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>

                    <Transition appear show={paymentModal} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={handlePaymentModal}
                      >
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
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-neutral-900 flex flex-row justify-between"
                                >
                                  <span>Payment</span>
                                  <span className="font-normal text-sm">
                                    Cashier: {user_data?.name}
                                  </span>
                                </Dialog.Title>
                                <div className="mt-2 text-neutral-900">
                                  <div className="text-neutral-900 py-3">
                                    <div className="space-y-1">
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
                                      <div className="flex flex-row gap-2 justify-end py-2">
                                        <button
                                          onClick={() => {
                                            setCash(cash + 10000);
                                          }}
                                          className="inline-flex justify-center rounded-md border border-transparent bg-green-500/70 hover:bg-green-500 px-4 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300"
                                        >
                                          10k
                                        </button>
                                        <button
                                          onClick={() => {
                                            setCash(cash + 50000);
                                          }}
                                          className="inline-flex justify-center rounded-md border border-transparent bg-green-500/70 hover:bg-green-500 px-4 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300"
                                        >
                                          50k
                                        </button>
                                        <button
                                          onClick={() => {
                                            setCash(cash + 100000);
                                          }}
                                          className="inline-flex justify-center rounded-md border border-transparent bg-green-500/70 hover:bg-green-500 px-4 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300"
                                        >
                                          100k
                                        </button>
                                      </div>
                                      <div className="flex justify-between">
                                        <h2>Change:</h2>
                                        <h2>Rp.{cash - totalPayment}</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <button
                                    type="button"
                                    disabled={cash - totalPayment < 0}
                                    className={`inline-flex justify-center rounded-md border border-transparent ${
                                      cash - totalPayment < 0
                                        ? "bg-gray-700/70"
                                        : "bg-green-500/70 hover:bg-green-500"
                                    } px-4 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300`}
                                    onClick={() => {
                                      pushTransactions();
                                      handlePaymentModal();
                                      handleInvoiceModal();
                                    }}

                                    //
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>

                    <Transition appear show={invoiceModal} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={handleInvoiceModal}
                      >
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
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-neutral-900 flex flex-row justify-between"
                                >
                                  Invoice
                                </Dialog.Title>
                                <div className="mt-2 text-neutral-900">
                                  <div className="text-neutral-900 py-3">
                                    {isTransactionLoading ? (
                                      "Loading"
                                    ) : (
                                      <>
                                        <h3>
                                          Transaction{" "}
                                          {isSuccess
                                            ? "Successfully!"
                                            : "Failed!"}
                                        </h3>
                                        <div className="mt-4">
                                          <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300 bg-green-500/70 hover:bg-green-500 w-24"
                                            onClick={() => {
                                              setIsRedirecting(true);
                                              push(
                                                `/invoice/${lastTransactionID}`
                                              );
                                            }}

                                            //
                                          >
                                            {isRedirecting ? (
                                              <ButtonSpinner />
                                            ) : (
                                              "Invoice"
                                            )}
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
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
