import { PiCoatHangerFill } from "react-icons/pi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Search from "../components/search/Search";
import FilterProduct from "../components/filter/filterProduct";

const Explore = () => {
  const navigate = useNavigate();
  const goPrevious = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col p-3 py-24 md:py-32">
      {/* upper nav */}
      <div className="w-full flex items-center justify-between fixed top-0 left-0 bg-black border-b-1 border-white/20 z-10 gap-3 px-5 py-5">
        {/* goPrevious */}
        <FiArrowLeft
          onClick={goPrevious}
          className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
        />
        <h2 className="hidden lg:block text-xl md:text-3xl cursor-default font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Explore
        </h2>

        <div className="flex items-center justify-end gap-5 text-2xl md:text-2xl">
          {/* search input */}
          <Search />

          <PiCoatHangerFill className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        </div>
      </div>

      <div className="w-full flex flex-col items-start justify-center md:p-3 gap-2">
        <div className="w-full rounded-lg overflow-hidden">
          <img src="./images/explore1.png" className="w-[full] object-cover" />
        </div>
        <FilterProduct />
      </div>
    </div>
  );
};

export default Explore;
