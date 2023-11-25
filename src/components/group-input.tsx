import React, { useEffect, useState } from "react";
import InputField from "./input-field";
import RemoveIcon from "./icons/remove-icon";

type props = {
  groupId: number;
  id: number;
  name: string;
  value: number;
  updateValue: (id: number, name: string, value: number) => void;
  remove: (groupId: number, id: number) => void;
};

const GroupInput = ({
  groupId,
  id,
  name,
  value,
  updateValue,
  remove,
}: props) => {
  const [nameVal, setNameVal] = useState<string>(name);
  const [valueVal, setValueVal] = useState<number>(value);

  useEffect(() => {
    setNameVal(name);
    setValueVal(value);
  }, [name, value]);

  useEffect(() => {
    updateValue(id, nameVal, valueVal);
  }, [nameVal, valueVal]);

  const onNameChange = (value: string) => setNameVal(value);
  const onValueChange = (value: string) => setValueVal(parseInt(value));

  return (
    <div className="flex flex-row min-w-[500px]">
      <InputField
        id={groupId + "name" + id}
        value={nameVal}
        onChange={onNameChange}
        className="w-[250px]"
      />
      <InputField
        id={groupId + "value" + id}
        value={valueVal}
        onChange={onValueChange}
        className="w-[30px]"
      />
      <div className="pt-1" onClick={() => remove(groupId, id)}>
        <RemoveIcon />
      </div>
    </div>
  );
};

export default GroupInput;
