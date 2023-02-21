const { createSlice } = require("@reduxjs/toolkit");

const initialState = { 
    cart: [],
    carts: [],
    total: 0
 };

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        setCarts: (state, action) => {
            const { carts, total } = action.payload;
            state.carts = carts;
            state.total = total;
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {
    setCarts,
    addToCart,
    removeFromCart
} = cartSlice.actions