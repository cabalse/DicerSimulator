import React from "react";
import GroupInput from "./group-input";
import DataGroup from "../models/data-group";

type props = {
  groupId: number;
  title: string;
  desc: string;
  data: DataGroup[];
  updateValue: (
    groupId: number,
    id: number,
    name: string,
    value: number
  ) => void;
  addNewValue: () => void;
};

const Group = ({
  groupId,
  title,
  desc,
  data,
  updateValue,
  addNewValue,
}: props) => {
  const updateSingleValue = (id: number, name: string, value: number) =>
    updateValue(groupId, id, name, value);

  return (
    <div className="w-72 border border-gray-300 rounded-md p-4 m-2">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mb-4">{desc}</div>
      {data.map((item) => (
        <GroupInput
          groupId={groupId}
          {...item}
          updateValue={updateSingleValue}
          key={item.id}
        />
      ))}
      <div className="flex justify-end">
        <button
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
          onClick={addNewValue}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Group;
