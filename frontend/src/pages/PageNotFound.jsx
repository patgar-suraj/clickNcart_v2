import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { TbArrowLeftDashed } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-3 gap-5">
      <span className="text-[#D4E80D] text-2xl md:text-5xl lg:text-7xl flex gap-3">
        <BiError /> PAGE NOT FOUND <BiError />
      </span>
      <Link
        to="/"
        className="relative flex items-center justify-center bg-[#D4E80D] border-transparent my-5 py-2 px-5 text-black font-bold rounded-full 
  transition-all duration-300 
  shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
      >
        <TbArrowLeftDashed className="text-3xl" /> Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
