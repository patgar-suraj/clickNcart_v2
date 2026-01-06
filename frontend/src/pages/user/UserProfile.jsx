import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
import { FiUser } from "react-icons/fi";
import {
  asyncDeleteUser,
  asynclogoutuser,
  asyncUpdateUser,
} from "../../store/actions/userActions";
import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

const UserProfile = () => {
  const { userData } = useSelector((state) => state.userReducer);

  // update product
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      password: userData?.password || "",
    },
  });

  // Reset form when userData changes
  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username || "",
        email: userData.email || "",
        password: userData.password || "",
      });
    }
  }, [userData, reset]);

  const [preview, setPreview] = useState(userData?.image || null);
  const watchedImage = watch("image");

  useEffect(() => {
    if (
      watchedImage &&
      watchedImage.length > 0 &&
      watchedImage[0] instanceof File
    ) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
    if (userData?.image && typeof userData.image === "string") {
      setPreview(userData.image);
    }
  }, [watchedImage, userData]);

  const dispatch = useDispatch();

  const toBase = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const updateUserHandler = async (user) => {
    try {
      const updatedUser = { ...user };

      if (
        user.image &&
        user.image.length > 0 &&
        user.image[0] instanceof File
      ) {
        updatedUser.image = await toBase(user.image[0]);
      } else {
        updatedUser.image = userData?.image ?? null;
      }

      const result = await dispatch(asyncUpdateUser(userData.id, updatedUser));

      if (result && result.success) {
        toast.success("📝 Your profile has been updated!");
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      console.log("Update failed", error);
      toast.error("Failed to update profile!");
    }
  };
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate(-1);
  };

  const logOutHandler = () => {
    dispatch(asynclogoutuser());
    toast.success("👋 You have been logged out!");
    navigate("/");
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const wraningHandler = () => {
    setShowConfirm(true);
  };

  const cancelHandler = () => {
    setShowConfirm(false);
  };

  const deleteHandler = () => {
    dispatch(asyncDeleteUser(userData.id));
    toast.success("😓The account has been deleted!");
    navigate("/");
  };

  return userData ? (
    <div className="w-full flex flex-col items-center justify-center md:gap-10 px-5 py-32">
      <div className="w-full fixed z-10 top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <FiArrowLeft
          onClick={goPrevious}
          className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
        />

        <h2 className="text-xl cursor-default md:text-3xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Profile
        </h2>
        {/* cart */}
        <FiUser className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
      </div>

      <form
        onSubmit={handleSubmit(updateUserHandler)}
        className="relative w-full md:w-[60vw] xl:w-[40%] flex flex-col items-center justify-center gap-5 p-5 bg-[#1a1a1abc]  border-1 border-[#D4E80D] rounded-4xl"
      >
        {/* image preview */}
        {/* user image input */}
        <div className="w-[120px] h-[120px] relative flex items-center justify-center rounded-full overflow-hidden border-2 border-[#D4E80D]">
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
        {/* delete user profile */}
        <div>
          <button
            type="button"
            onClick={wraningHandler}
            className="absolute flex flex-col items-center justify-center top-2 right-2 bg-[#e80d0d] cursor-pointer border-transparent p-1 text-black rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
          >
            <IoWarning className="text-3xl" />
          </button>

          {showConfirm && (
            <div className="absolute top-0 left-0 rounded-4xl z-10 w-full h-full flex flex-col items-center justify-center bg-black/90">
              <p className="text-2xl text-center font-semibold text-[#D4E80D]">
                Are you sure to <span className="text-[#e80d0d]">"delete"</span> your account?
              </p>
              <div className="w-full flex items-center justify-center gap-5 my-10">
                <div
                  type="button"
                  onClick={cancelHandler}
                  className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
                >
                  CANCEL
                </div>
                <button
                  type="button"
                  onClick={deleteHandler}
                  className="relative bg-[#e80d0d] cursor-pointer border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="w-full border-dashed border-white/20" />
        <hr className="w-[80%] -mt-2 border-dashed border-white/20" />
        <hr className="w-[50%] -mt-2 border-dashed border-white/20" />

        {/* user name */}
        <div className="w-full flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.username && errors.username.message}
          </span>
          <input
            {...register("username", {
              required: "[ username is required ]",
            })}
            type="text"
            placeholder="username"
            className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* user email */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.email && errors.email.message}
          </span>
          <input
            {...register("email", {
              required: "[ email is required ]",
            })}
            type="email"
            placeholder="email"
            className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* user password */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.password && errors.password.message}
          </span>
          <input
            {...register("password", {
              required: "[ password is required ]",
            })}
            type="password"
            placeholder="password"
            className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* button */}
        <div className="w-full gap-5 flex items-center justify-center">
          {/* update */}
          <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
            UPDATE
          </button>
          {/* logout */}
          <button
            onClick={logOutHandler}
            className="relative bg-[#e80d0d] cursor-pointer border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
          >
            LOGOUT
          </button>
        </div>
      </form>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default UserProfile;
