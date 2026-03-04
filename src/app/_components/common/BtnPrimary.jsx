const BtnPrimary = ({ text, className = "" }) => {
  return (
    <button
      className={`cursor-pointer mt-4 bg-[#FE5443] text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-white hover:border hover:border-[#000000] transition ${className}`}
    >
      {text}
    </button>
  );
};

export default BtnPrimary;
