const { configureStore } = require("@reduxjs/toolkit");
import { cartReducer } from "./cart.slice";
import { productReducer } from "./product.slice";
import { generalReducer } from "./general.slice";

const reducer = {
    product: productReducer,
    cart: cartReducer,
    general: generalReducer
};

const store = configureStore({
    reducer
})

export default store;