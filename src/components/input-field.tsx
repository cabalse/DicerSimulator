import React from "react";

type props = {
  id: string;
  title: string;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
};

const InputField = ({ id, title, value, onChange, className = "" }: props) => {
  let style =
    "border-b focus:outline-none focus:border-blue-500 transition duration-300 border-gray-300 px-2 py-1 mr-4";
  if (className) style += " " + className;

  return (
    <div className="flex flex-row">
      {title ? <div className="mr-4">{title}</div> : null}
      <input
        id={id}
        type="text"
        className={style}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
