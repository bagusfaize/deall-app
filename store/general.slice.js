const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isLoading: false
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const generalReducer = generalSlice.reducer;

export const {
    setIsLoading
} = generalSlice.actions