"use client";

import { useState } from "react";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    console.log("openning");
  };

  return (
    <div className="">
      <button
        onClick={() => {
          handleOpenClose();
        }}
      >
        Open MODALLL
      </button>
      {isOpen ? (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30"
          onClick={() => {
            handleOpenClose();
          }}
        >
          <div className="bg-amber-300 p-6 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Modal;
