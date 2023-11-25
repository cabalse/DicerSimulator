import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const CenterOnScreen = ({ children }: props) => (
  <div className="h-screen flex items-center justify-center">{children}</div>
);

export default CenterOnScreen;
