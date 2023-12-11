import React, { useEffect, useState } from "react";
import InputField from "../atoms/input-field";
import RemoveIcon from "../atoms/icons/remove-icon";

type Props = {
  groupId: number;
  id: number;
  name: string;
  value: string;
  updateValue: (id: number, name: string, value: string) => void;
  remove: (groupId: number, id: number) => void;
};

const GroupInput = ({
  groupId,
  id,
  name,
  value,
  updateValue,
  remove,
}: Props) => {
  const [nameVal, setNameVal] = useState<string>(name);
  const [valueVal, setValueVal] = useState<string>(value);

  useEffect(() => {
    setNameVal(name);
    setValueVal(value);
  }, [name, value]);

  useEffect(() => {
    updateValue(id, nameVal, valueVal);
  }, [nameVal, valueVal]);

  const onNameChange = (value: string) => setNameVal(value);
  const onValueChange = (value: string) => setValueVal(value);

  return (
    <div className="flex flex-row min-w-[500px]">
      <InputField
        id={groupId + "name" + id}
        title=""
        value={nameVal}
        onChange={onNameChange}
        className="w-[250px]"
      />
      <InputField
        id={groupId + "value" + id}
        title=""
        value={valueVal}
        onChange={onValueChange}
        className="w-[45px]"
      />
      <div className="pt-1" onClick={() => remove(groupId, id)}>
        <RemoveIcon />
      </div>
    </div>
  );
};

export default GroupInput;
