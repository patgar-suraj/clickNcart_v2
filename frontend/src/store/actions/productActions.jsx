import axios from "../../api/axiosconfig";
import { loadproduct } from "../reducres/productSlice";

// load product
export const asyncLoadProduct = () => async (dispatch, getState) => {
    try {
        const {data} = await axios.get("/products")
        dispatch(loadproduct(data))
  } catch (error) {
    console.log(error);
  }
}

// create product
export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product)
    dispatch(asyncLoadProduct())
  } catch (error) {
    console.log(error);
  }
};

// create product
export const asyncUpdateProduct = (id, product) => async (dispatch, getState) => {
  try {
    await axios.patch("/products/" + id, product)
    dispatch(asyncLoadProduct())
  } catch (error) {
    console.log(error);
  }
};

// delete product
export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/products/" + id)
    dispatch(asyncLoadProduct())
  } catch (error) {
    console.log(error);
  }
};