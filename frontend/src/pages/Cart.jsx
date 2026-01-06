import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { asyncUpdateUser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.userData);
  const productData = useSelector((state) => state.productReducer.productData);

  const navigate = useNavigate();
  const goPrevious = () => {
    navigate(-1);
  };

  // Increase product quantity
  const increaseQuantity = (index, product) => {
    const copyuser = { ...userData, cart: [...userData.cart] };
    if (userData.cart[index].quantity < 10) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity + 1,
      };
    } else {
      toast.warn("We're sorry! Only 10 unit(s) allowed in each order");
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  // Decrease product quantity
  const decreaseQuantity = (index, product) => {
    const copyuser = { ...userData, cart: [...userData.cart] };
    if (userData.cart[index].quantity > 1) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  // Remove product from cart
  const removeQuantity = (productId) => {
    const copyuser = { ...userData, cart: [...userData.cart] };
    copyuser.cart = copyuser.cart.filter(
      (item) => item.product.id !== productId
    );
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
    toast.dismiss();
    toast.success("🧩 Item removed from cart");
  };

  const loadingData = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center text-[#D4E80D] bg-black/80">
        <span className="text-2xl font-semibold animate-pulse">
          🛒 Loading your cart...
        </span>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center text-white bg-black/90">
        <MdOutlineShoppingCart className="text-6xl text-[#D4E80D] mb-3" />
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-sm text-white/70 mt-2">
          Start adding products to your cart!
        </p>
        <Link
          to="/"
          className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
        >
          Browse Products
        </Link>
      </div>
    );
  };

  const cartItems = userData.cart.map((c, index) => {
    return (
      <ul
        key={c.product.id}
        className="w-full items-center justify-center 
        rounded-2xl md:rounded-br-3xl 
        bg-[#1a1a1abc] backdrop-blur-md border border-white/20 
        hover:bg-[#1A1A1A] transition-all p-2 shadow-lg"
      >
        <li className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full flex items-start justify-start gap-5 md:gap-8">
            <div className="flex flex-col gap-3">
              <div
                className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] 
                bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden"
              >
                <img
                  src={c.product.image}
                  alt="product image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-[140px] lg:w-[200px] border border-[#D4E80D]/60 rounded-xl flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <button
                  onClick={() => decreaseQuantity(index, c)}
                  className="w-[30%] cursor-pointer pb-1 font-bold text-black bg-[#D4E80D]/90 rounded-l-xl flex items-center justify-center active:scale-[0.97]"
                >
                  -
                </button>
                <h3 className="w-[40%] bg-black/30 backdrop-blur-sm pb-1 font-semibold flex items-center justify-center text-white">
                  {c.quantity}
                </h3>
                <button
                  onClick={() => increaseQuantity(index, c)}
                  className="w-[30%] cursor-pointer pb-1 font-bold text-black bg-[#D4E80D]/90 rounded-r-xl flex items-center justify-center active:scale-[0.97]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 items-start justify-start">
              <h1 className="capitalize font-semibold">
                {" "}
                {c.product.title.length > 50
                  ? `${c.product.title.slice(0, 50)}...`
                  : c.product.title}{" "}
              </h1>
              <h2 className="capitalize text-center px-2 my-2 font-semibold text-[#D4E80D] bg-white/10 backdrop-blur-sm rounded-full">
                ₹{(c.product.price * c.quantity).toLocaleString("en-IN")}
              </h2>
              <span className="text-sm capitalize text-white/60">
                {" "}
                {c.product.gender}{" "}
              </span>
              <span className="text-sm capitalize"> {c.product.category} </span>
              <p className="capitalize text-sm text-white/60">
                {c.product.desc.length > 100
                  ? `${c.product.desc.slice(0, 100)}...`
                  : c.product.desc}
              </p>
            </div>
          </div>
          <hr />
          <div className="w-full flex items-center justify-center md:items-end md:justify-end gap-5">
            <button
              onClick={() => removeQuantity(c.product.id)}
              className="cursor-pointer text-sm flex items-center justify-center active:scale-[0.96] 
              bg-red-600/80 backdrop-blur-md border border-red-400/40 py-2 px-5 text-white font-bold rounded-full 
              transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
            >
              Remove <AiOutlineDelete className="text-lg ml-2" />
            </button>
            <button
              className="cursor-pointer text-sm flex items-center justify-center active:scale-[0.96] 
              bg-[#D4E80D]/90 backdrop-blur-md border border-[#D4E80D]/50 py-2 px-5 text-black font-bold rounded-full 
              transition-all duration-300 shadow-md hover:shadow-[0_0_7px_2px_#D4E80D]"
            >
              Buy this now{" "}
              <AiOutlineThunderbolt className="text-lg mt-1 ml-2" />
            </button>
          </div>
        </li>
      </ul>
    );
  });

  const totalItems = userData?.cart?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = userData?.cart?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryCharge = totalPrice < 1000 ? 40 : 0;
  const discountAmount = totalPrice > 2000 ? totalPrice * 0.1 : 0;
  const finalAmount = totalPrice - discountAmount + deliveryCharge;

  // 🧾 Main cart layout
  return (
    <div className="w-full bg-black/60 px-3 py-24 md:py-32">
      {/* upper nav */}
      <div className="w-full fixed z-10 top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <FiArrowLeft
          onClick={goPrevious}
          className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
        />

        <h2 className="text-xl cursor-default md:text-3xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          My Cart
        </h2>
        <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
      </div>

      {!userData || !userData.cart ? (
        loadingData()
      ) : userData.cart.length === 0 ? (
        emptyCart()
      ) : (
        <div className="relative flex flex-col md:flex-row gap-5 lg:gap-15 lg:px-20  w-full items-start justify-center">
          <div className="flex flex-col w-full lg:w-[60%] items-center justify-center gap-3">
            {cartItems}
          </div>

          <div className="sticky top-24 w-full lg:w-[40%] flex flex-col gap-5 items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#1a1a1abc] hover:bg-[#1A1A1A] transition-all backdrop-blur-md border border-white/20 p-4 shadow-lg">
              <span className="text-[#D4E80D]">
                "Get free delivery on orders above ₹1000"
              </span>
              <span className="text-[#D4E80D]">
                "Get a 10% discount on purchases above ₹2000"
              </span>
            </div>

            <div className="w-full flex flex-col gap-2 rounded-2xl bg-[#1a1a1abc] hover:bg-[#1A1A1A] transition-all backdrop-blur-md border border-white/20 p-4 shadow-lg">
              <h1 className="text-white text-xl font-semibold border-b border-white/20 pb-2">
                Price Details
              </h1>
              <div className="flex items-center justify-between text-white/80">
                <p>
                  Price (<span className="text-[#D4E80D]">{totalItems}</span>{" "}
                  items)
                </p>
                <p>₹{totalPrice.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <p>Delivery Charges</p>
                {deliveryCharge > 0 ? (
                  <p>₹{deliveryCharge.toLocaleString("en-IN")}</p>
                ) : (
                  <p className="text-[#D4E80D]">FREE</p>
                )}
              </div>
              <div className="flex items-center justify-between text-white/80">
                <p>Discount</p>
                {discountAmount > 0 ? (
                  <p className="text-[#D4E80D]">
                    ₹{discountAmount.toLocaleString("en-IN")}
                  </p>
                ) : (
                  <p>--</p>
                )}
              </div>

              <hr className="border-dashed border-white/20" />

              <div className="flex items-center justify-between text-white font-bold text-lg">
                <p>Total Amount</p>
                <p>₹{finalAmount.toLocaleString("en-IN")}</p>
              </div>

              <hr className="border-dashed border-white/20" />

              <div className="flex items-center justify-center text-[#D4E80D]">
                <p>
                  You will save ₹{discountAmount.toLocaleString("en-IN")} on
                  this order🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
