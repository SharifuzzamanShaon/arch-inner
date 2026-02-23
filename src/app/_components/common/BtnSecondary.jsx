const BtnSecondary = ({ text, onClick, darkMode = false }) => {
  const buttonClasses = darkMode
    ? "mt-4 bg-transparent text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
    : "mt-4 bg-transparent text-black px-4 py-2 rounded-full border border-black hover:bg-[#FE5443] hover:text-white hover:border-[#FE5443] transition";

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnSecondary;
