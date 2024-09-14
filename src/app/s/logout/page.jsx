"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import ButtonSpinner from "@/components/Utilities/ButtonSpinner";

const Page = () => {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const handleisLoading = () => {
        setIsLoading(!isLoading)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="">
                <Transition appear show={true} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setIsOpen(false)}
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
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Logout
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to logout?
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-row justify-end gap-x-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-400/50 transition-all duration-500"
                                                onClick={() => router.back()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="w-24 inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-800 transition-all duration-500"
                                                onClick={() => {
                                                    handleisLoading();
                                                    signOut({ callbackUrl: '/login' });
                                                }}

                                            >
                                                {isLoading ?
                                                    <h4>Logout</h4>
                                                    : (<div className="">
                                                        <ButtonSpinner />
                                                    </div>)}


                                                
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Are you sure you want to logout? */}
            </div>
        </div>
    );
};

export default Page;
