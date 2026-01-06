import LoadingPage from "../../loading/LoadingPage";
import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProducts from "../../utils/useInfiniteProducts";
const ProductTemp = lazy(() => import("./ProductTemp"));

const Products = () => {
  const { productData, hasMore, fetchProducts } = useInfiniteProducts();

  return (
    <InfiniteScroll
      dataLength={productData.length}
      next={fetchProducts}
      loader={
        <h4 className="text-[#D4E80D] md:text-2xl text-center font-semibold">
          Loading...
        </h4>
      }
      hasMore={hasMore}
      endMessage={
        <div className="w-full p-3">
          <p style={{ textAlign: "center" }}>
            {" "}
            <img
              src="./images/deals.jpg"
              alt="sale"
              className="rounded-lg my-5 lg:my-14"
            />
            <b className="text-[#D4E80D] font-thin md:text-xl">
              ⪻ Yay! You have seen it all ⪼
            </b>{" "}
          </p>
        </div>
      }
    >
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-10 px-3 lg:px-6 pt-5 lg:pt-10 overflow-hidden">
        {productData.map((product) => (
          <Suspense key={product.id} fallback={<LoadingPage />}>
            <ProductTemp product={product} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
