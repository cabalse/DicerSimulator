import React, { ReactNode } from "react";
import AddNewDataGroup from "../molecules/add-new-data-group";
import LoadDataGroups from "../organisms/load-data-groups";
import SaveDataGroups from "../molecules/save-data-groups";

type Props = {
  title: string;
  inputControls: ReactNode;
  result: ReactNode;
};

const Layout = ({ title, inputControls, result }: Props) => (
  <>
    <div className="flex flex-row pt-4 pl-12">
      <div className="flex flex-col">
        <div className="p-2">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex flex-row">
            <AddNewDataGroup />
            <LoadDataGroups />
            <SaveDataGroups />
          </div>
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
