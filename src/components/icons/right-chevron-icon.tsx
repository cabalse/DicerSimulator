import React from "react";

type props = {
  onClick?: () => void;
  enabled?: boolean;
};

const RightChevronIcon = ({ onClick, enabled = true }: props) => {
  const stroke = enabled ? "#000000" : "#999999";

  const handleClick = () => {
    if (enabled) {
      if (onClick) onClick();
    }
  };

  return (
    <div onClick={handleClick}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <rect width="24" height="24" fill="white"></rect>
          <path
            d="M9.5 7L14.5 12L9.5 17"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default RightChevronIcon;