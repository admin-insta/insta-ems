import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: [], // Start with an empty array
  reducers: {
    addEmployee: (state, action) => {
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload]; // Add multiple employees
      } else {
        state.push(action.payload); // Add a single employee
      }
    },
    setEmployees: (state, action) => { 
      if (Array.isArray(action.payload)) {
        return [...action.payload]; 
      }
    },
    updateEmployee: (state, action) => {
      const updatedUser = action.payload;  
  
      const index = state.findIndex(emp => emp._id === updatedUser._id);
      if (index !== -1) {
          state[index] = { ...state[index], ...updatedUser }; 
      } else {
          console.error("Employee not found in Redux store!", state, updatedUser);
      }
  }, 
  
    removeEmployee: (state, action) => {
      return state.filter((person) => person._id !== action.payload._id);
    },
  },
});

export const { addEmployee, updateEmployee, removeEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
