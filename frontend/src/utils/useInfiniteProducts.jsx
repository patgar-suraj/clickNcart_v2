import axios from "../api/axiosconfig";
import { toast } from "react-toastify";
import { loadlazyproduct, loadproduct } from "../store/reducres/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";

const useInfiniteProducts = () => {
  const { productData } = useSelector((state) => state.productReducer);
  const [hasMore, sethasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Initial load - fetch first 10 products
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/products?_limit=10&_start=0");
        if (data.length > 0) {
          dispatch(loadproduct(data));
          sethasMore(data.length >= 10);
        } else {
          sethasMore(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Products Not Available!");
        sethasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProducts();
  }, [dispatch]);

  // Fetch more products for infinite scroll
  const fetchProducts = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/products?_limit=10&_start=${productData.length}`
      );
      
      if (data.length === 0) {
        sethasMore(false);
      } else {
        // Only set hasMore to true if we got a full batch
        sethasMore(data.length >= 10);
        dispatch(loadlazyproduct(data));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load more products!");
      sethasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [productData.length, dispatch, isLoading]);

  return { productData, hasMore, fetchProducts };
};

export default useInfiniteProducts;
