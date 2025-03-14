import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice"
import salaryReducer from "./salarySlice"
const appStore = configureStore({
  reducer: { user: userReducer, employee : employeeReducer, salary: salaryReducer},
});
export default appStore;
