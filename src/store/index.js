import { configureStore } from "@reduxjs/toolkit";
import wouldRatherSlice from "./reducers";

export default configureStore({
  reducer: { app: wouldRatherSlice },
});
