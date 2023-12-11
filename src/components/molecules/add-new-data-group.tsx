import React, { useContext } from "react";

import AppContext from "../../context/app-context";
import { DICE } from "../../constants/ttypes";
import Button from "../atoms/button";

const AddNewDataGroup = () => {
  const appContext = useContext(AppContext);

  const addNewDataGroup = () => {
    const newDataGroups = [...appContext.dataGroups];
    newDataGroups.push({
      id: appContext.dataGroups.length + 1,
      name: "",
      desc: "",
      ttype: DICE,
      dataValues: [{ id: 0, name: "", value: "0" }],
    });
    appContext.setDataGroups(newDataGroups);
  };

  return (
    <Button
      text="Add DataGroup"
      className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={addNewDataGroup}
    />
  );
};

export default AddNewDataGroup;
