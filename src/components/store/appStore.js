import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice"
const appStore = configureStore({
  reducer: { user: userReducer, employee : employeeReducer},
});
export default appStore;
