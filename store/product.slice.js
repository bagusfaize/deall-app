const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    products: [],
    filteredProduct: [],
    total: 0,
    categories: [],
    filter: {},
    showFilter: true
};

const filterData = (data, query) => {
    const filteredData = data.filter((item) => {
        for (let key in query) {
            if (item[key] === undefined || !query[key].includes(item[key])) {
                return false;
            }
        }
        return true
    });
    return filteredData;
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            const { products, total } = action.payload;
            state.products = products;
            state.total = total;
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        updateFilter: (state, action) => {
            const filter = action.payload;
            const unfilteredProduct = JSON.parse(JSON.stringify(state.products));
            const filteredProduct = unfilteredProduct.filter(item => {
                for (const key in filter) {
                    if (item[key] === undefined || !filter[key].includes(item[key])) {
                        return false;
                    }
                }
                return true;
            })
            console.log('clg filter', filter);
            state.filter = filter;
            state.filteredProduct = filteredProduct;
            state.total = filteredProduct.length
        },
        toggleShowFilter: (state, action) => {
            state.showFilter = action.payload
        }
    }
});

export const productReducer = productSlice.reducer;

export const {
    setProducts,
    setCategories,
    updateFilter,
    toggleShowFilter
} = productSlice.actions