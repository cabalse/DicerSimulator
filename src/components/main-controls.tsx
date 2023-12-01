import React from "react";
import Button from "./atoms/button";

type Props = {
  addNewDataGroups: () => void;
  handleOpenFileSelectDialog: () => void;
  saveDataGroupToFile: () => void;
};

const MainControls = ({
  addNewDataGroups,
  handleOpenFileSelectDialog,
  saveDataGroupToFile,
}: Props) => (
  <>
    <Button
      text="Add DataGroup"
      className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={addNewDataGroups}
    />
    <Button
      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={handleOpenFileSelectDialog}
      text="Load DataGroups"
    />
    <Button
      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={saveDataGroupToFile}
      text="Save DataGroups"
    />
  </>
);

export default MainControls;
