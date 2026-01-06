import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductTemp = ({ product }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.userData);

  const addToCartHandler = (product) => {
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

  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="group w-full overflow-hidden flex flex-col items-start justify-start hover:rounded-b-lg transition-transform duration-200 border-[#D4E80D] hover:border-b-2 hover:-translate-y-2"
    >
      {/* image */}
      <div className="relative w-full h-48 md:h-60 lg:h-64 bg-[#131313] flex items-start rounded-lg  justify-center overflow-hidden">
        <img
          src={product.image}
          className="w-full h-full object-cover group-hover:opacity-100 opacity-90"
          alt={
            product.title.length > 23
              ? `${product.title.slice(0, 23)}...`
              : product.title
          }
        />
        <div>
          <MdOutlineShoppingCart
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCartHandler(product);
            }}
            className="absolute bottom-5 right-5 text-black bg-white hover:bg-[#D4E80D] active:scale-[0.96] rounded-full p-1 text-4xl"
          />
        </div>
      </div>

      {/* title / category / price */}
      <div className="w-full p-2 break-all flex items-center justify-start  flex-col gap-1">
        <h1 className="capitalize text-lg font-semibold">
          {" "}
          {product.title.length > 23
            ? `${product.title.slice(0, 23)}...`
            : product.title}{" "}
        </h1>
        <p className="capitalize font-semibold text-white/60">
          {" "}
          {product.category}{" "}
        </p>
        <h2 className="text-lg font-bold text-[#D4E80D]"> ₹{product.price} </h2>
      </div>
    </Link>
  );
};

export default ProductTemp;
