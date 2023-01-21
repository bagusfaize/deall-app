const { configureStore } = require("@reduxjs/toolkit");
import { cartReducer } from "./cart.slice";
import { productReducer } from "./product.slice";

const reducer = {
    product: productReducer,
    cart: cartReducer
};

const store = configureStore({
    reducer
})

export default store;