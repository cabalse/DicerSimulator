import React, { useState, useContext } from "react";
import FadeLoader from "react-spinners/FadeLoader";

import Button from "../atoms/button";
import Modal from "../molecules/modal";
import CenterOnScreen from "../atoms/center-on-screen";
import AppContext from "../../context/app-context";

const LoadDataGroups = () => {
  const appContext = useContext(AppContext);
  const [displayFileSelectModal, setDisplayFileSelectModal] =
    useState<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayLoader(false);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        if (reader.result) {
          const dataGroups = JSON.parse(reader.result.toString());
          appContext.setDataGroups(dataGroups);
        }
      };
      reader.onerror = function () {
        console.log(reader.error);
      };
      reader.readAsText(file);
    }
    setDisplayFileSelectModal(false);
  };

  const handleOpenFileSelectDialog = () => {
    setDisplayFileSelectModal(true);
  };

  const handleFileClick = () => {
    setDisplayLoader(true);
  };

  const fileSelectModal = (
    <>
      <h1 className="text-lg font-semibold mb-4">Select and Download a File</h1>
      <input
        type="file"
        className="mb-4"
        onClick={handleFileClick}
        onChange={handleFileChange}
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
        onClick={handleUpload}
      >
        Upload
      </button>
      <button
        id="closeModal"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray ml-2"
        onClick={() => setDisplayFileSelectModal(false)}
      >
        Close
      </button>
    </>
  );

  return (
    <>
      <Button
        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
        onClick={handleOpenFileSelectDialog}
        text="Load DataGroups"
      />
      <Modal display={displayFileSelectModal}>{fileSelectModal}</Modal>
      {displayLoader ? (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <CenterOnScreen>
            <FadeLoader color="#009900" />
          </CenterOnScreen>
        </div>
      ) : null}
    </>
  );
};

export default LoadDataGroups;
