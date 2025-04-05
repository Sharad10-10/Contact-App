import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <>
        <div className="p-4 flex flex-col z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[200px] w-[90%] max-w-md bg-white rounded-md">
          <div className="flex justify-end">
            <AiOutlineClose
              onClick={onClose}
              className="text-2xl cursor-pointer"
            />

          </div>
          {children}
        </div>      
        

      <div
        onClick={onClose}
        className="z-10 backdrop-blur h-screen w-screen absolute top-0"
      />

    </>)}

    </>
  );
}

export default Modal;
