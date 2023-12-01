import React, { useState } from "react";
import GroupInput from "./group-input";
import DataGroup from "../models/data-group";
import EditIcon from "./icons/edit-icon";
import Modal from "./modal";
import InputField from "./atoms/input-field";
import AddIcon from "./icons/add-icon";
import LeftChevronIcon from "./icons/left-chevron-icon";
import RightChevronIcon from "./icons/right-chevron-icon";
import { DICE, MODIFIERS, TARGETS } from "../consts/ttypes";

type Props = {
  groupId: number;
  title: string;
  desc: string;
  ttype: string;
  data: DataGroup[];
  updateValue: (
    groupId: number,
    id: number,
    name: string,
    value: number
  ) => void;
  addNewValue: () => void;
  removeValue: (groupId: number, id: number) => void;
  updateMetaValues: (
    groupId: number,
    title: string,
    desc: string,
    ttype: string
  ) => void;
  position: (groupId: number) => "first" | "last" | "middle";
  moveGroup: (groupId: number, direction: "up" | "down") => void;
  removeGroup: (groupId: number) => void;
};

const Group = ({
  groupId,
  title,
  desc,
  ttype,
  data,
  updateValue,
  addNewValue,
  removeValue,
  updateMetaValues,
  position,
  moveGroup,
  removeGroup,
}: Props) => {
  const [displayMetaEditModal, setDisplayMetaEditModal] = useState(false);

  const updateSingleValue = (id: number, name: string, value: number) =>
    updateValue(groupId, id, name, value);

  const onChangeTitle = (value: string) =>
    updateMetaValues(groupId, value, desc, ttype);

  const onChangeDesc = (value: string) =>
    updateMetaValues(groupId, title, value, ttype);

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    updateMetaValues(groupId, title, desc, e.target.value);

  const onMoveDown = () => moveGroup(groupId, "down");

  const onMoveUp = () => moveGroup(groupId, "up");

  const onRemoveGroup = () => {
    removeGroup(groupId);
    setDisplayMetaEditModal(false);
  };

  const metaEditModal = (
    <div className="flex flex-col">
      <InputField
        id="MetaInputFieldTitle"
        title="Title"
        value={title}
        onChange={onChangeTitle}
        className="w-[300px]"
      />
      <div className="mt-2">
        <InputField
          id="MetaInputFieldDesc"
          title="Description"
          value={desc}
          onChange={onChangeDesc}
          className="w-[400px]"
        />
      </div>
      <select className="border mt-2" onChange={onChangeType}>
        <option selected={ttype === DICE}>Dice</option>
        <option selected={ttype === MODIFIERS}>Modifiers</option>
        <option selected={ttype === TARGETS}>Targets</option>
      </select>
      <button className="text-left text-red-500 mt-2" onClick={onRemoveGroup}>
        Remove Group
      </button>
      <div className="flex flex-row justify-end mt-2">
        <button onClick={() => setDisplayMetaEditModal(false)}>Done</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-md p-4 m-2 w-[370px]">
        <div className="flex flex-row flex-wrap grow-0 shrink-0">
          <div className="pb-3 w-[300px]">
            <div className="text-xl font-semibold">{title}</div>
            <div className="mb-2">{desc}</div>
            <div>
              <span className="mr-2">Type:</span>
              <span>{ttype}</span>
            </div>
          </div>
          <div
            className="flex flex-column"
            onClick={() => setDisplayMetaEditModal(true)}
          >
            <EditIcon />
          </div>
        </div>
        {data.map((item) => (
          <GroupInput
            groupId={groupId}
            {...item}
            updateValue={updateSingleValue}
            key={item.id}
            remove={() => removeValue(groupId, item.id)}
          />
        ))}
        <div className="flex flex-col flex-auto justify-end">
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row">
              <LeftChevronIcon
                onClick={onMoveDown}
                enabled={position(groupId) != "first"}
              />
              <RightChevronIcon
                onClick={onMoveUp}
                enabled={position(groupId) != "last"}
              />
            </div>
            <div className="flex flex-row" onClick={addNewValue}>
              <span className="mr-2">Add</span> <AddIcon />
            </div>
          </div>
        </div>
      </div>
      <Modal display={displayMetaEditModal}>{metaEditModal}</Modal>
    </>
  );
};

export default Group;
