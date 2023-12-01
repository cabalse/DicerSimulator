import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterOnScreen = ({ children }: Props) => (
  <div className="h-screen flex items-center justify-center">{children}</div>
);

export default CenterOnScreen;
