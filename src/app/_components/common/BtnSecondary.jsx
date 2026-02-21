const BtnSecondary = ({ text, onClick }) => {
  return (
    <button
      className="mt-4 bg-transparent text-black px-4 py-2 rounded-full border border-black hover:bg-[#FE5443] hover:text-white hover:border-[#FE5443] transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BtnSecondary;
