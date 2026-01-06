import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncLoadProduct } from "../../store/actions/productActions";

const Search = () => {
  const product = useSelector((state) => state.productReducer.productData);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product || product.length === 0) {
      dispatch(asyncLoadProduct());
    }
  }, [dispatch, product]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = product.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="relative">
      <div className="transition-all duration-300 overflow-scroll flex w-[90%] md:w-[60vw] xl:w-[45vw] pr-2 gap-3 items-center justify-between bg-[#D4E80D] text-black rounded">
        <input
          type="text"
          placeholder="search here..."
          value={query}
          onChange={handleSearch}
          className="p-1 md:p-2 w-full ml-2 text-lg outline-none"
        />
        <div className="w-[2px] h-[7vw] md:h-[5vw] lg:h-[2vw] bg-black"></div>
        <BiSearchAlt className="text-3xl cursor-pointer hover:text-black/80 active:scale-[0.96]" />
      </div>
      {filteredProducts.length > 0 && (
        <div className="absolute top-[110%] left-[-15%] md:left-0 w-[130%] md:w-full bg-black border border-[#D4E80D] rounded-lg shadow-lg z-10 max-h-140 overflow-y-auto">
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="flex items-center p-2 hover:bg-[#D4E80D] hover:text-black"
              onClick={() => {
                setQuery("");
                setFilteredProducts([]);
              }}
            >
              <img src={p.image} alt={p.title} className="w-10 h-10 object-cover mr-3" />
              <span className="text-lg">{p.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
