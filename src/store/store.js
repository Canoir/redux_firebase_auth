import { configureStore } from "@reduxjs/toolkit";
//
import user from "../slices/userSlice";
//
const store = configureStore({
  reducer: { user },
  middleware: (_) =>
    _({
      serializableCheck: false,
    }),
});
//
export default store;
