import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const index = state.value.findIndex((el) => el._id === payload._id);
      if (index < 0) {
        state.value.push({ ...payload, amount: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    remove: (state, { payload }) => {
      state.value = state.value.filter((el) => el._id !== payload._id);
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    increaseAmount: (state, { payload }) => {
      const index = state.value.findIndex((el) => el._id === payload._id);
      if (index >= 0) {
        state.value[index].amount += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    decreaseAmount: (state, { payload }) => {
      const index = state.value.findIndex((el) => el._id === payload._id);
      if (index >= 0 && state.value[index].amount > 1) {
        state.value[index].amount -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeAll: (state) => {
      state.value = [];
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    defaultCartValues: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  add,
  remove,
  increaseAmount,
  decreaseAmount,
  removeAll,
  defaultCartValues,
} = cartSlice.actions;
export default cartSlice.reducer;
