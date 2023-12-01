import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

const Button = ({ text, onClick, className = "" }: Props) => {
  let style =
    "bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800";
  if (className) style += " " + className;

  return (
    <button className={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
