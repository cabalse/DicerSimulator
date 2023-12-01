import React, { ReactNode } from "react";
import CenterOnScreen from "./atoms/center-on-screen";

type Props = {
  children: ReactNode;
  display: boolean;
};

const Modal = ({ children, display }: Props) => {
  return (
    <>
      {display ? (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <CenterOnScreen>
            <div className="w-[400px] border border-gray-300 rounded-md bg-white p-4 m-2">
              {children}
            </div>
          </CenterOnScreen>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
