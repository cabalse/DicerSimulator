import React, { useState, useEffect, ReactNode } from "react";
import fileDownload from "js-file-download";
import FadeLoader from "react-spinners/FadeLoader";

import Group from "./../group";
import DataGroups from "./../../models/data-groups";
import CenterOnScreen from "./../atoms/center-on-screen";
import MainControls from "./../main-controls";
import Layout from "./../layout";
import Modal from "./../modal";
import SimulationResult from "./../simulation-result";
import { DICE } from "./../../consts/ttypes";

type Props = {
  title: string;
};

const MainPage = ({ title }: Props) => {
  const [dataGroups, setDataGroups] = useState<Array<DataGroups>>([]);
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
      ttype: DICE,
      dataGroup: [{ id: 0, name: "", value: 0 }],
    });
    setDataGroups(newDataGroups);
  };

  const saveDataGroupToFile = () => {
    const res = JSON.stringify(dataGroups);
    fileDownload(res, "dataGroups.txt");
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

  const updateMetaValues = (
    groupId: number,
    title: string,
    desc: string,
    ttype: string
  ) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.name = title;
        part.desc = desc;
        part.ttype = ttype;
      }
    });
    setDataGroups(newDataGroups);
  };

  const removeElementFromArray = (arr: Array<any>, index: number) => {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const removeValue = (groupId: number, id: number) => {
    const newDataGroups = [...dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.dataGroup.forEach(function (part, index, arr) {
          if (part.id === id) {
            arr = removeElementFromArray(arr, index);
          }
        });
      }
    });
    setDataGroups(reIndexAllIds(newDataGroups));
  };

  const reIndexAllIds = (array: DataGroups[]): DataGroups[] => {
    const newArray = [...array];
    newArray.forEach(function (part, index, arr) {
      part.id = index + 1;
      part.dataGroup.forEach(function (part, index, arr) {
        part.id = index + 1;
      });
    });
    return newArray;
  };

  const moveGroup = (groupId: number, direction: "up" | "down") => {
    const newDataGroups = [...dataGroups];
    const index = newDataGroups.findIndex((item) => item.id === groupId);
    if (direction === "down") {
      if (index > 0) {
        const temp = newDataGroups[index - 1];
        newDataGroups[index - 1] = newDataGroups[index];
        newDataGroups[index] = temp;
      }
    } else {
      if (index < newDataGroups.length - 1) {
        const temp = newDataGroups[index + 1];
        newDataGroups[index + 1] = newDataGroups[index];
        newDataGroups[index] = temp;
      }
    }
    setDataGroups(newDataGroups);
  };

  const removeGroup = (groupId: number) => {
    const newDataGroups = [...dataGroups];
    const index = newDataGroups.findIndex((item) => item.id === groupId);
    if (index > -1) {
      newDataGroups.splice(index, 1);
    }
    setDataGroups(reIndexAllIds(newDataGroups));
  };

  const givePosition = (groupId: number) => {
    const index = dataGroups.findIndex((item) => item.id === groupId);
    const length = dataGroups.length;
    if (index === 0) {
      return "first";
    } else if (index === length - 1) {
      return "last";
    } else {
      return "middle";
    }
  };

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
        <div className="flex flex-row flex-wrap">
          {dataGroups.map((item) => (
            <Group
              groupId={item.id}
              title={item.name}
              desc={item.desc}
              ttype={item.ttype}
              data={item.dataGroup}
              updateValue={updateValue}
              addNewValue={() => addNewDataGroup(item.id)}
              removeValue={removeValue}
              updateMetaValues={updateMetaValues}
              key={item.id}
              position={givePosition}
              moveGroup={moveGroup}
              removeGroup={removeGroup}
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

  const appContent = (
    <>
      <Layout
        {...{ title, menu, inputControls }}
        result={<SimulationResult dataGroups={dataGroups} />}
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

  return appContent;
};

export default MainPage;
