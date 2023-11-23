import React, { useEffect, useState } from "react";

type props = {
  groupId: number;
  id: number;
  name: string;
  value: number;
  updateValue: (id: number, name: string, value: number) => void;
};

const GroupInput = ({ groupId, id, name, value, updateValue }: props) => {
  const [nameVal, setNameVal] = useState(name);
  const [valueVal, setValueVal] = useState(value);

  useEffect(() => {
    setNameVal(name);
    setValueVal(value);
  }, [name, value]);

  useEffect(() => {
    updateValue(id, nameVal, valueVal);
  }, [nameVal, valueVal]);

  return (
    <div>
      <input
        id={groupId + "name" + id}
        type="text"
        className="border-b focus:outline-none focus:border-blue-500 transition duration-300 border-gray-300 px-2 py-1 mr-4"
        value={nameVal}
        onChange={(e) => setNameVal(e.target.value)}
      />
      <input
        id={groupId + "value" + id}
        type="text"
        className="w-8 border-b focus:outline-none focus:border-blue-500 transition duration-300 border-gray-300 px-2 py-1"
        value={valueVal}
        onChange={(e) => setValueVal(Number(e.target.value))}
      />
    </div>
  );
};

export default GroupInput;
