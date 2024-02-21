"use client";

import { useState } from "react";

const Modal = ({ children, disable, text}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    console.log("openning");
  };

  return (
    <div className="">
      <button
        onClick={() => {
          if (!disable) {
            handleOpenClose();
          }
        }}
        disabled={disable}
        className={disable ? `opacity-50` : ``}
      >
        {text}
      </button>
      {isOpen ? (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30"
          onClick={() => {
            handleOpenClose();
          }}
        >
          <div className="bg-neutral-600 p-6 rounded-lg shadow-md">
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
