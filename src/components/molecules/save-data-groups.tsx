import React, { useContext } from "react";
import fileDownload from "js-file-download";

import Button from "../atoms/button";
import AppContext from "../../context/app-context";

const SaveDataGroups = () => {
  const appContext = useContext(AppContext);

  const saveDataGroupToFile = () => {
    const res = JSON.stringify(appContext.dataGroups);
    fileDownload(res, "dataGroups.txt");
  };

  return (
    <Button
      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={saveDataGroupToFile}
      text="Save DataGroups"
    />
  );
};

export default SaveDataGroups;
