import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
import { useSelector } from "react-redux";
import { CgArrowLongRightR } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  asyncDeleteProduct,
  asyncLoadProduct,
  asyncUpdateProduct,
} from "../../store/actions/productActions";
import { toast } from "react-toastify";
import { asyncUpdateUser } from "../../store/actions/userActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector((state) => state.userReducer.userData);

  const productData = useSelector((state) => state.productReducer.productData);
  const product = productData?.find((product) => product.id == id);

  useEffect(() => {
    if (!product) {
      dispatch(asyncLoadProduct());
    }
  }, [dispatch, product]);

  const [rating, setRating] = useState("");
  const [size, setSize] = useState("");

  // add to cart

  const addToCartHandler = (product) => {
    if (!userData) {
      toast.error("Please login to add items to your cart");
      return;
    }
    const copyuser = { ...userData, cart: [...userData.cart] };
    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
    if (x == -1) {
      copyuser.cart.unshift({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
    toast.dismiss();
    toast.success("🛒Item added to cart");
  };

  // update product
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      desc: product?.desc,
      category: product?.category,
      price: product?.price,
      gender: product?.gender,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        image: product?.image,
        title: product?.title,
        desc: product?.desc,
        category: product?.category,
        price: product?.price,
        gender: product?.gender,
      });
    }
  }, [product, reset]);

  const watchedImage = watch("image", product?.image);

  const updateHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    toast.success("Product Updated!");
    reset();
  };

  const navigate = useNavigate();

  const goPrevious = () => {
    navigate(-1);
  };

  const deleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    toast.success("Product Deleted!");
    navigate("/");
  };

  const goCart = () => {
    navigate("/cart");
  };

  return product ? (
    <div className="w-full relative md:px-5 py-24 md:py-32">
      {/* upper nav */}
      <div className="w-full fixed top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <FiArrowLeft
          onClick={goPrevious}
          className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
        />

        <h2 className="text-xl cursor-default md:text-3xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Details
        </h2>
        {/* cart */}
        <MdOutlineShoppingCart
          onClick={goCart}
          className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]"
        />
      </div>

      {/* product */}
      <div className="w-full flex flex-col px-5 md:flex-row items-center justify-center md:justify-start md:items-start md:gap-10">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center justify-center">
            <img
              src={watchedImage}
              alt="product image"
              className="w-[400px] h-[400px] object-contain rounded-4xl "
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center md:px-[20px] lg:px-[50px] xl:px-[144px] py-10 gap-5">
            <button className="w-full cursor-pointer text-xl flex items-center justify-center active:scale-[0.98] bg-[#D4E80D] border-transparent py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
              Buy now <CgArrowLongRightR className="text-2xl mt-2 ml-2" />
            </button>
            <button
              disabled={!userData}
              onClick={() => addToCartHandler(product)}
              className="w-full cursor-pointer text-xl flex items-center justify-center active:scale-[0.98] bg-[#e8d90d] border-transparent py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e8d90d]"
            >
              Add to Cart <MdOutlineShoppingCart className="text-2xl ml-2" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col md:gap-5 items-start justify-start">
          <div className="w-full flex md:flex-col items-start gap-3 justify-between">
            <h1 className="capitalize text-xl lg:text-2xl font-bold">
              {" "}
              {product.title}{" "}
            </h1>
            <h2 className="bg-[#343338] text-xl font-bold flex items-center justify-center my-3 py-2 px-5 text-[#D4E80D] rounded-full ">
              {" "}
              ₹{product.price}{" "}
            </h2>
          </div>

          <div className="w-full flex flex-col gap-2 items-start justify-start">
            <span className="capitalize text-white/70">{product.gender}</span>
            <span className="capitalize text-white/70">
              {" "}
              {product.category}{" "}
            </span>
            <p className="capitalize text-white/70"> {product.desc} </p>
          </div>

          {/* size selection */}
          <div className="w-full flex mt-10 md:mt-3 items-center justify-start gap-3">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <span
                key={s}
                onClick={() => setSize(s)}
                className={`cursor-pointer text-2xl py-1 px-3 border rounded font-semibold transition-all duration-200 ${
                  size === s
                    ? "text-[#D4E80D] border-[#D4E80D]"
                    : "text-white border-gray-500 hover:border-[#D4E80D]"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          {/* star rating */}
          <div className="w-full flex items-center justify-around text-4xl my-10 lg:px-10 xl:px-28">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition-all duration-100 active:scale-90 active:-translate-y-2 ${
                  rating >= star ? "text-[#D4E80D]" : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* update product */}
      {userData && userData?.isAdmin && (
        <div className="flex flex-col w-full items-center justify-center px-5 pt-14 pb-24">
          <span className="text-[#D4E80D] text-[16px] md:text-xl mb-5 w-full text-center py-3 border-1 border-[#D4E80D] border-dashed">
            ⪻ Update Product ⪼
          </span>
          <form
            onSubmit={handleSubmit(updateHandler)}
            className="w-full md:w-[60vw] xl:w-1/2 flex flex-col items-center justify-center gap-5 p-5 bg-[#1a1a1abc]  border-1 border-[#D4E80D] rounded-4xl"
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
                className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
              />
            </div>

            {/* product gender */}
            <div className="w-full  flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.gender && errors.gender.message}
              </span>
              <select
                {...register("gender", {
                  required: "[ Product gender is required ]",
                })}
                className="outline-0 w-full p-2 rounded-2xl border-b-2 border-r-2 border-l-2 border-[#272626] bg-black font-semibold text-[16px] hover:bg-[#00000080] focus:bg-[#00000080] focus:text-[#D4E80D] placeholder:font-thin placeholder:text-sm"
              >
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

            {/* button */}
            <div className="w-full gap-5 flex items-center justify-center">
              <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
                UPDATE
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="relative cursor-pointer bg-[#e80d0d] border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
              >
                DELETE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProductDetails;
