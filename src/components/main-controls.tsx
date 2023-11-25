import React from "react";

type props = {
  addNewDataGroups: () => void;
  handleOpenFileSelectDialog: () => void;
  saveDataGroupToFile: () => void;
};

const MainControls = ({
  addNewDataGroups,
  handleOpenFileSelectDialog,
  saveDataGroupToFile,
}: props) => (
  <>
    <button
      className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={addNewDataGroups}
    >
      Add DataGroup
    </button>
    <button
      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={handleOpenFileSelectDialog}
    >
      Load DataGroups
    </button>
    <button
      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
      onClick={saveDataGroupToFile}
    >
      Save DataGroups
    </button>
  </>
);

export default MainControls;
