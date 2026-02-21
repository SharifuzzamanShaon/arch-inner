import React from "react";

const BtnPrimary = ({ text }) => {
  return (
    <button
      className="mt-4 bg-[#FE5443] text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-black hover:border hover:border-[#000000] transition"
    >
      {text}
    </button>
  );
};

export default BtnPrimary;
