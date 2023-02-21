import axios from "axios";
import CONFIG from "./config";

const callApi = async (endpoint, params) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}${endpoint}`, {params});
    return res;
  } catch (error) {
    throw error;
  }
}

export const getProductsDispatcher = (params) => {
  let productEndpoint = 'product';
  if ('q' in params) {
    productEndpoint = 'products/search';
  } else if ('category' in params) {
    productEndpoint = `products/category/${params.category}`;
    delete params.category;
  }
  return callApi(productEndpoint, params)
};

export const getCartsDispatcher = (params) => callApi('carts', params);

export const getCartDetailsDispatcher = (id) => callApi(`carts/${id}`);

export const getCategoriesDispatcher = () => callApi('products/categories');


const callAPI = {
  getProductsDispatcher,
  getCategoriesDispatcher,
  getCartsDispatcher,
  getCartDetailsDispatcher
};

export default callAPI;