import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import peopleReducer from "./peopleSlice"
const appStore = configureStore({
  reducer: { user: userReducer, people : peopleReducer},
});
export default appStore;
