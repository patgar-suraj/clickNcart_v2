import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncregisteruser } from "../store/actions/userActions";
import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiClothesline } from "react-icons/gi";

const Register = () => {
  const user = useSelector((state) => state.userReducer.userData);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [baseImg, setBaseImg] = useState("");

  const profileImg = watch("image");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileImg && profileImg[0]) {
      const file = profileImg[0];

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImg(reader.result);
      };
      reader.readAsDataURL(file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImg]);

  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = true;
    user.image = baseImg;
    user.cart = [];

    dispatch(asyncregisteruser(user));
    navigate("/login");
    toast.success("🎉 Registered successfully!");
    reset();
    setPreview(null);
    setBaseImg("");
  };

  return (
    <div className="py-32">
      <div className="w-full fixed top-0 left-0 bg-black border-b-1 z-10 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <Link to="/products">
          <FiArrowLeft className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]" />
        </Link>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Register
        </h2>
        {/* cart */}
        {user ? (
          <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        ) : (
          <GiClothesline className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        )}{" "}
      </div>

      <form
        onSubmit={handleSubmit(registerHandler)}
        className="flex flex-col w-full items-center justify-center px-5"
      >
        {/* profile picture */}
        <div className="w-[120px] h-[120px] mb-10 relative flex items-center justify-center rounded-full hover:bg-[#adff6e0b] overflow-hidden border-2 border-[#D4E80D]">
          <input
            {...register("image")}
            type="file"
            id="fileUpload"
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="outline-0 w-full cursor-pointer text-center"
          >
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            ) : (
              <HiOutlineUser className="w-full text-6xl text-white/50 text-center" />
            )}
          </label>
        </div>

        <div className="w-full md:w-[50vw] xl:w-[30vw] flex flex-col items-center justify-center gap-5 p-5 bg-[#1a1a1abc]  border-1 border-[#D4E80D] rounded-4xl">
          {/* username */}
          <div className="w-full flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.username && errors.username.message}
            </span>
            <input
              {...register("username", {
                required: "[ Username is required ]",
              })}
              type="text"
              placeholder="john-doe"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-lg hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* email */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.email && errors.email.message}
            </span>
            <input
              {...register("email", { required: "[ Email is required ]" })}
              type="email"
              placeholder="johndoe@gmail.com"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-lg hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* password */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.password && errors.password.message}
            </span>
            <input
              {...register("password", {
                required: "[ Password is required ]",
              })}
              type="password"
              placeholder="********"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-lg hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* button */}
          <button className="relative cursor-pointer bg-[#D4E80D] border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
            REGISTER
          </button>

          <div className="flex items-center justify-center gap-2">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-[#D4E80D] underline underline-offset-2"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
