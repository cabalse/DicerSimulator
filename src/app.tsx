import React, { useState, useEffect, ReactNode } from "react";
import fileDownload from "js-file-download";
import FadeLoader from "react-spinners/FadeLoader";

import Group from "./components/group";
import DataGroups from "./models/data-groups";
import CenterOnScreen from "./components/center-on-screen";
import MainControls from "./components/main-controls";
import Layout from "./components/layout";
import Modal from "./components/modal";

function App() {
  const [dataGroups, setDataGroups] = useState<Array<DataGroups>>([]);
  const [displayFileSelectModal, setDisplayFileSelectModal] =
    useState<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayLoader(false);
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("File name: ", e.target.files[0].name);
      console.log("Last modified: ", e.target.files[0].lastModified);
    }
  };

  const handleUpload = async () => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        if (reader.result) {
          const dataGroups = JSON.parse(reader.result.toString());
          setDataGroups(dataGroups);
        }
      };
      reader.onerror = function () {
        console.log(reader.error);
      };
      reader.readAsText(file);
    }
    setDisplayFileSelectModal(false);
  };

  const addNewDataGroups = () => {
    const newDataGroups = [...dataGroups];
    newDataGroups.push({
      id: dataGroups.length + 1,
      name: "",
      desc: "",
      dataGroup: [{ id: 0, name: "", value: 0 }],
    });
    setDataGroups(newDataGroups);
  };

  const saveDataGroupToFile = () => {
    fileDownload(JSON.stringify(dataGroups), "dataGroups.txt");
  };

  const addNewDataGroup = (groupId: number) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        const newData = [
          ...part.dataGroup,
          { id: part.dataGroup.length + 1, name: "", value: 0 },
        ];
        part.dataGroup = newData;
      }
    });
    setDataGroups(newDataGroups);
  };

  const updateValue = (
    groupId: number,
    id: number,
    name: string,
    value: number
  ) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        const newData = part.dataGroup.map((item) => {
          if (item.id === id) {
            return { ...item, name, value };
          }
          return item;
        });
        part.dataGroup = newData;
      }
    });
    setDataGroups(newDataGroups);
  };

  const handleOpenFileSelectDialog = () => {
    setDisplayFileSelectModal(true);
  };

  const handleFileClick = () => {
    setDisplayLoader(true);
  };

  const updateMetaValues = (groupId: number, title: string, desc: string) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.name = title;
        part.desc = desc;
      }
    });
    setDataGroups(newDataGroups);
  };

  const removeValue = (groupId: number, id: number) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.dataGroup.forEach(function (innerPart, innerIndex, innerArr) {
          if (innerPart.id === id) {
            part.dataGroup.splice(index, 1);
          }
        });
      }
    });
    setDataGroups(newDataGroups);
  };

  const title = "Dicer Simulator";

  const menu = (
    <MainControls
      {...{
        addNewDataGroups,
        saveDataGroupToFile,
        handleOpenFileSelectDialog,
      }}
    />
  );

  const inputControls = (
    <>
      {dataGroups.length > 0 ? (
        <div className="flex flex-wrap">
          {dataGroups.map((item) => (
            <Group
              groupId={item.id}
              title={item.name}
              desc={item.desc}
              data={item.dataGroup}
              updateValue={updateValue}
              addNewValue={() => addNewDataGroup(item.id)}
              removeValue={removeValue}
              updateMetaValues={updateMetaValues}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-4 m-2">
          <div className="italic">Add or Load DataGroup(s)</div>
        </div>
      )}
    </>
  );

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
      <Layout {...{ title, menu, inputControls }} />
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
}

export default App;
