import { useSelector } from "react-redux";
import { RiHome3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Products from "../components/product/Products";
import HeroSection from "../components/home/HeroSection";
import { FaShopware } from "react-icons/fa6";
import Search from "../components/search/Search";

const Home = () => {
  const user = useSelector((state) => state.userReducer.userData);

  return (
    <div className="w-full py-24 md:py-32">
      {/* upper nav */}
      <div className="w-full flex items-center justify-between fixed top-0 left-0 bg-black border-b-1 border-white/20 z-10 gap-3 px-5 py-5">
        {/* logo */}
        <h2 className="text-xl cursor-default flex items-center justify-center gap-2 font-semibold text-[#D4E80D]">
          <div className="flex flex-col items-center justify-center">
            <span className="hidden md:block">clickNcart</span>
            <span className="hidden md:block text-[8px] -mt-1.5">
              cloth store
            </span>
          </div>{" "}
          <FaShopware className="text-3xl" />
        </h2>
        <h2 className="hidden lg:block text-xl cursor-default md:text-3xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Home
        </h2>

        <div className="flex items-center justify-end gap-5 text-2xl md:text-2xl">
          {/* search input */}
          <Search />

          {user ? (
            <>
              <RiHome3Line className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="relative bg-[#D4E80D] hidden md:block cursor-pointer border-transparent py-2 px-5 text-sm text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
              >
                LOGIN
              </Link>
              <RiHome3Line className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
            </>
          )}
        </div>
      </div>
      {/* ///////////////////////////// */}
      <HeroSection />
      {/* ///////////////////////////// */}
      <Products />
    </div>
  );
};

export default Home;
