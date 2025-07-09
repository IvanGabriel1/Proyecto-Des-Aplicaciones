import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categories: categories,
    products: products,
    categorySelected: "",
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
  },
});

export const { setCategorySelected } = shopSlice.actions;
export default shopSlice.reducer;
