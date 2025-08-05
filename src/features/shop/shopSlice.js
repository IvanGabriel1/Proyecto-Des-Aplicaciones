import { createSlice, current } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categories: categories,
    products: products,
    categorySelected: "",
    productsFilterByCategory: [],
    productSelected: {},
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
      //console.log(current(state).categorySelected);
    },
    filterProducts: (state, action) => {
      state.productsFilterByCategory = products.filter(
        (product) =>
          product.category.toLowerCase() ===
          state.categorySelected.toLowerCase()
      );
    },
    setProductSelected: (state, action) => {
      state.productSelected = action.payload;
    },
  },
});

export const { setCategorySelected, filterProducts, setProductSelected } =
  shopSlice.actions;
export default shopSlice.reducer;
