import React, { ReactNode } from "react";

type props = {
  title: string;
  menu: ReactNode;
  inputControls: ReactNode;
};

const Layout = ({ title, menu, inputControls }: props) => (
  <div className="flex flex-row p-12">
    <div className="flex flex-col">
      <div className="p-2">
        <div className="text-xl font-semibold">{title}</div>
        <div className="flex flex-row">{menu}</div>
      </div>
      {inputControls}
    </div>
  </div>
);

export default Layout;
