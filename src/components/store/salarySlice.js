import { createSlice } from "@reduxjs/toolkit";

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    salary: null,
  },
  reducers: {
    setSalary: (state, action) => {
      state.salary = action.payload;
    },
    updateSalary: (state, action) => {
      state.salary = { ...state.salary, ...action.payload };
    },
  },
});

export const { setSalary, updateSalary } = salarySlice.actions;
export default salarySlice.reducer;
