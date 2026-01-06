import { useState, useMemo, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { asyncUpdateUser } from "../../store/actions/userActions";
import { toast } from "react-toastify";
import { asyncLoadProduct } from "../../store/actions/productActions";

const ProductCard = ({ product }) => {
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
    <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          <h2 className="text-lg font-bold text-[#D4E80D]">
            {" "}
            ₹{product.price}{" "}
          </h2>
        </div>
      </Link>
    </div>
  );
};

const FilterProduct = () => {
  const { productData } = useSelector((state) => state.productReducer);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productData || productData.length === 0) {
      dispatch(asyncLoadProduct());
    }
  }, [dispatch, productData]);

  const genders = useMemo(
    () => ["all", ...new Set(productData.map((p) => p.gender))],
    [productData]
  );
  const categories = useMemo(
    () => ["all", ...new Set(productData.map((p) => p.category))],
    [productData]
  );

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const genderMatch =
        selectedGender === "all" || product.gender === selectedGender;
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;
      return genderMatch && categoryMatch;
    });
  }, [productData, selectedGender, selectedCategory]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-1/4 pt-5 lg:pt-10">
          <div className="sticky top-24 py-1 md:py-3 px-2 md:px-4 bg-[#131313e2] hover:bg-[#131313] border border-[#D4E80D] rounded-lg shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <h2 className="text-2xl font-semibold text-white">Filters</h2>

              <span className="lg:hidden text-white text-xl">
                {isFilterOpen ? (
                  <IoIosArrowDropupCircle className="text-2xl" />
                ) : (
                  <IoIosArrowDropdown className="text-2xl" />
                )}
              </span>
            </div>

            <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
              <div className="border border-dashed border-white/20 my-4"></div>

              <div className="flex lg:flex-col gap-5">
                <div>
                  <h3 className="text-lg mb-2 text-white/80">Gender</h3>
                  <div className="flex flex-wrap gap-2">
                    {genders.map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={`px-4 py-1 rounded-full text-sm font-medium capitalize transition-colors duration-300 ${
                          selectedGender === gender
                            ? "bg-[#D4E80D] text-black"
                            : "bg-black text-white/80 border border-black hover:border-[#D4E80D]"
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-dashed border-white/20"></div>

                <div>
                  <h3 className="text-lg mb-2 text-white/80">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1 rounded-full text-sm font-medium capitalize transition-colors duration-300 ${
                          selectedCategory === category
                            ? "bg-[#D4E80D] text-black"
                            : "bg-black text-white/80 border border-black hover:border-[#D4E80D]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10 lg:pt-10 overflow-hidden">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <h3 className="text-2xl font-semibold text-[#D4E80D]">
                📭 No Products Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FilterProduct;
