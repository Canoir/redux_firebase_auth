import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, { payload }) {},
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;
