import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";

const CreateProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const imgPreview = watch("image");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    navigate("/products");
    toast.success("Product Created!");
    reset();
  };

  const canclebtn = () => {
    navigate("/products");
  };

  const goPrevious = () => {
    navigate(-1);
  };

  return (
    <div className="md:px-5 py-24 md:py-32">
      <div className="flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-5 px-5">
        {/* upper nav */}
        <div className="w-full fixed top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
          <FiArrowLeft
            onClick={goPrevious}
            className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
          />
          <h2 className="text-xl cursor-default md:text-3xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
            Create Product
          </h2>
          {/* cart */}
          <IoCreateOutline className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        </div>

        {/* product image preview */}
        <div className="w-[60vw] md:w-[40vw] xl:w-[20vw] flex items-center justify-center">
          {imgPreview ? (
            <img
              src={imgPreview}
              alt="product image"
              onError={(e) => (e.target.style.display = "none")}
              className="rounded-4xl w-full object-cover"
            />
          ) : (
            <span className="text-xl text-[#D4E80D]">[ Image Preview ]</span>
          )}
        </div>

        <form
          onSubmit={handleSubmit(createHandler)}
          className="w-full md:w-[60vw] xl:w-1/2 flex bg-[#131313] flex-col items-center justify-center gap-5 p-5  border-1 border-[#D4E80D] rounded-2xl"
        >
          {/* product image */}
          <div className="w-full flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.image && errors.image.message}
            </span>
            <input
              {...register("image", {
                required: "[ Product image is required ]",
              })}
              type="url"
              placeholder="product image url"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* product name */}
          <div className="w-full flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.title && errors.title.message}
            </span>
            <input
              {...register("title", {
                required: "[ Product name is required ]",
              })}
              type="text"
              placeholder="product name"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* product desc */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.desc && errors.desc.message}
            </span>
            <textarea
              {...register("desc", {
                required: "[ Product description is required ]",
              })}
              type="desc"
              placeholder="Product description"
              className="outline-0 w-full min-h-[8rem] max-h-[15rem] p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            ></textarea>
          </div>

          {/* product price */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.price && errors.price.message}
            </span>
            <input
              {...register("price", {
                required: "[ Product price is required ]",
              })}
              type="number"
              step="0.01"
              placeholder="product price"
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-medium text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* product gender */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.gender && errors.gender.message}
            </span>
            <select
              {...register("gender", { required: "[ Gender is required ]" })}
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-medium text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            >
              <option className="bg-black" value="">
                Select Gender
              </option>
              <option className="bg-black" value="men">
                Men
              </option>
              <option className="bg-black" value="women">
                Women
              </option>
              <option className="bg-black" value="boys">
                Boys
              </option>
              <option className="bg-black" value="girls">
                Girls
              </option>
            </select>
          </div>

          {/* product category */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.category && errors.category.message}
            </span>
            <select
              {...register("category", {
                required: "[ Product category is required ]",
              })}
              className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-medium text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
            >
              <option className="bg-black" value="">
                Select Category
              </option>
              <option className="bg-black" value="shirt">
                Shirt's
              </option>
              <option className="bg-black" value="pant">
                Pant's
              </option>
              <option className="bg-black" value="hoodie">
                Hoodie's
              </option>
            </select>
          </div>

          {/* button */}
          <div className="flex gap-5 items-start justify-center">
            <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
              CREATE
            </button>
            <button
              type="button"
              onClick={canclebtn}
              className="relative cursor-pointer bg-[#e80d0d] border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
            >
              CANCLE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
