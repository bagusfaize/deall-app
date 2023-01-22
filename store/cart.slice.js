const { createSlice } = require("@reduxjs/toolkit");

const initialState = { 
    cart: [],
    totalQty: 0,
    totalPrice: 0
 };

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isProductExist = state.cart.find(item => item.id === action.payload.id);
            if (isProductExist) {
                isProductExist.quantity++
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }
            state.totalQty = state.cart.reduce((prev, curr) => prev + curr.quantity, 0)
            state.totalPrice = state.cart.reduce((prev, curr) => prev + curr.price, 0)
        },
        removeFromCart: (state, action) => {
            const currentCart = JSON.parse(JSON.stringify(state.cart));
            const tempCart = currentCart.filter(item => item.id !== action.payload.id);
            state.cart = tempCart;
            state.totalPrice = state.cart.reduce((prev, curr) => prev + curr.price, 0)
            state.totalQty = state.cart.reduce((prev, curr) => prev + curr.quantity, 0)
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    removeFromCart
} = cartSlice.actions