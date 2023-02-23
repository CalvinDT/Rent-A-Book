import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    books: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addBook: (state, action) => {
      state.quantity += 1;
      state.books.push(action.payload);//new book
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addBook } = cartSlice.actions;
export default cartSlice.reducer;