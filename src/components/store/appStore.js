import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice"
import salaryReducer from "./salarySlice"
import leaveReducer from "./leaveSlice"
const appStore = configureStore({
  reducer: { user: userReducer, employee : employeeReducer, salary: salaryReducer, leave:leaveReducer},
});
export default appStore;
