import React, { ReactNode } from "react";

type Props = {
  title: string;
  menu: ReactNode;
  inputControls: ReactNode;
  result: ReactNode;
};

const Layout = ({ title, menu, inputControls, result }: Props) => (
  <>
    <div className="flex flex-row pt-4 pl-12">
      <div className="flex flex-col">
        <div className="p-2">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex flex-row">{menu}</div>
        </div>
        {inputControls}
      </div>
    </div>
    <div className="flex flex-col pt-4 pl-12">
      <div className="p-2">{result}</div>
    </div>
  </>
);

export default Layout;
