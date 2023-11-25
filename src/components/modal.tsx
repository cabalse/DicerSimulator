import React, { ReactNode, useState } from "react";
import CenterOnScreen from "./center-on-screen";

type props = {
  children: ReactNode;
  display: boolean;
};

const Modal = ({ children, display }: props) => {
  return (
    <>
      {display ? (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <CenterOnScreen>
            <div className="w-72 border border-gray-300 rounded-md bg-white p-4 m-2">
              {children}
            </div>
          </CenterOnScreen>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
