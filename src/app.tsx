import React, { useState } from "react";
import fileDownload from "js-file-download";

import Group from "./components/group";
import DataGroup from "./models/data-group";
import DataGroups from "./models/data-groups";

function App() {
  const [dataGroups, setDataGroups] = useState<Array<DataGroups>>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setDisplayModal(false);
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

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col">
          <div className="p-2">
            <div className="text-xl font-semibold">Dice Simulator</div>
            <div className="flex flex-row">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
                onClick={() => addNewDataGroups()}
              >
                Add DataGroup
              </button>
              <button
                className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
                onClick={() => setDisplayModal(true)}
              >
                Load DataGroups
              </button>
              <button
                className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
                onClick={saveDataGroupToFile}
              >
                Save DataGroups
              </button>
            </div>
          </div>
          {dataGroups.length > 0 ? (
            <div className="flex">
              {dataGroups.map((item) => (
                <Group
                  groupId={item.id}
                  title={item.name}
                  desc={item.desc}
                  data={item.dataGroup}
                  updateValue={updateValue}
                  addNewValue={() => addNewDataGroup(item.id)}
                  key={item.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-72 border border-gray-300 rounded-md p-4 m-2">
              <div className="italic">Add or Load DataGroup(s)</div>
            </div>
          )}
        </div>
      </div>
      {displayModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <div className="h-screen flex items-center justify-center">
            <div className="w-72 border border-gray-300 rounded-md bg-white p-4 m-2">
              <h1 className="text-lg font-semibold mb-4">
                Select and Download a File
              </h1>
              <input type="file" className="mb-4" onChange={handleFileChange} />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
                onClick={handleUpload}
              >
                Download
              </button>
              <button
                id="closeModal"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray ml-2"
                onClick={() => setDisplayModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
