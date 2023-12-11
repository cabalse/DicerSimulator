import React, { useContext } from "react";

import DataGroups from "./../../models/data-groups";
import Layout from "../atoms/layout";
import SimulationResult from "./../simulation-result";
import AppContext from "../../context/app-context";
import DataGroupInput from "../organisms/data-groups-input";
import Simulation from "../organisms/simulation";

type Props = {
  title: string;
};

const MainPage = ({ title }: Props) => {
  const appContext = useContext(AppContext);

  const addNewDataGroup = (groupId: number) => {
    const newDataGroups = [...appContext.dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        const newData = [
          ...part.dataValues,
          { id: part.dataValues.length + 1, name: "", value: "0" },
        ];
        part.dataValues = newData;
      }
    });
    appContext.setDataGroups(newDataGroups);
  };

  const updateValue = (
    groupId: number,
    id: number,
    name: string,
    value: string
  ) => {
    const newDataGroups = [...appContext.dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        const newData = part.dataValues.map((item) => {
          if (item.id === id) {
            return { ...item, name, value };
          }
          return item;
        });
        part.dataValues = newData;
      }
    });
    appContext.setDataGroups(newDataGroups);
  };

  const updateMetaValues = (
    groupId: number,
    title: string,
    desc: string,
    ttype: string
  ) => {
    const newDataGroups = [...appContext.dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.name = title;
        part.desc = desc;
        part.ttype = ttype;
      }
    });
    appContext.setDataGroups(newDataGroups);
  };

  const removeElementFromArray = (arr: Array<any>, index: number) => {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const removeValue = (groupId: number, id: number) => {
    const newDataGroups = [...appContext.dataGroups];
    newDataGroups.forEach(function (part, index, arr) {
      if (part.id === groupId) {
        part.dataValues.forEach(function (part, index, arr) {
          if (part.id === id) {
            arr = removeElementFromArray(arr, index);
          }
        });
      }
    });
    appContext.setDataGroups(reIndexAllIds(newDataGroups));
  };

  const reIndexAllIds = (array: DataGroups[]): DataGroups[] => {
    const newArray = [...array];
    newArray.forEach(function (part, index, arr) {
      part.id = index + 1;
      part.dataValues.forEach(function (part, index, arr) {
        part.id = index + 1;
      });
    });
    return newArray;
  };

  const moveGroup = (groupId: number, direction: "up" | "down") => {
    const newDataGroups = [...appContext.dataGroups];
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
    appContext.setDataGroups(newDataGroups);
  };

  const removeGroup = (groupId: number) => {
    const newDataGroups = [...appContext.dataGroups];
    const index = newDataGroups.findIndex((item) => item.id === groupId);
    if (index > -1) {
      newDataGroups.splice(index, 1);
    }
    appContext.setDataGroups(reIndexAllIds(newDataGroups));
  };

  const givePosition = (groupId: number) => {
    const index = appContext.dataGroups.findIndex(
      (item) => item.id === groupId
    );
    const length = appContext.dataGroups.length;
    if (index === 0) {
      return "first";
    } else if (index === length - 1) {
      return "last";
    } else {
      return "middle";
    }
  };

  const inputControls = (
    <>
      {appContext.dataGroups.length > 0 ? (
        <div className="flex flex-row flex-wrap">
          {appContext.dataGroups.map((item) => (
            <DataGroupInput
              groupId={item.id}
              title={item.name}
              desc={item.desc}
              ttype={item.ttype}
              data={item.dataValues}
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

  return <Layout {...{ title, inputControls }} result={<Simulation />} />;
};

export default MainPage;
