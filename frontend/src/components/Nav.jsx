import { NavLink } from "react-router-dom";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RiApps2AddLine } from "react-icons/ri";
import { PiCoatHangerFill } from "react-icons/pi";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.userData);

  return (
    <nav className="fixed z-50 border-t-2 bg-black border-[#1C1A1B] bottom-[-1px] left-0 w-full flex items-center justify-center">
      <div className="w-full md:w-[50vw] lg:w-[30vw] flex items-center justify-center mt-[-2px] md:text-xl">
        {/* home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
              isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
            }`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <span className="text-xl md:text-3xl xl:text-xl">HOME</span>
            ) : (
              <RiHome3Line className="text-3xl md:text-5xl xl:text-3xl" />
            )
          }
        </NavLink>

        {/* products */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
              isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
            }`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <span className="text-xl md:text-3xl xl:text-xl">EXPLORE</span>
            ) : (
              <PiCoatHangerFill className="text-3xl md:text-5xl xl:text-3xl" />
            )
          }
        </NavLink>

        {user && user.isAdmin ? (
          <>
            {/* create-product */}
            <NavLink
              to="/admin/create-product"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">CREATE</span>
                ) : (
                  <RiApps2AddLine className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
            {/* user profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">
                    PROFILE
                  </span>
                ) : (
                  <FiUser className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
            {/* add to cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">Cart</span>
                ) : (
                  <MdOutlineShoppingCart className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
          </>
        ) : user ? (
          <>
            {/* user profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">
                    PROFILE
                  </span>
                ) : (
                  <FiUser className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
            {/* add to cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">Cart</span>
                ) : (
                  <MdOutlineShoppingCart className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
          </>
        ) : (
          <>
            {/* login */}
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
                  isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <span className="text-xl md:text-3xl xl:text-xl">LOGIN</span>
                ) : (
                  <FiUser className="text-3xl md:text-5xl xl:text-3xl" />
                )
              }
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
