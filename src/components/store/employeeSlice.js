import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({ 
  name: "employee",
  initialState: [], // Start with an empty array
  reducers: {
    addEmployee: (state, action) => { 
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload]; // Add multiple employee at once
      } else {
        state.push(action.payload); // Add a single person
      }
    },
    setEmployees: (state, action) => { 
      if (Array.isArray(action.payload)) {
        return [...action.payload]; 
      }
    },
    editEmployee: (state, action) => {
      const index = state.findIndex((person) => person.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update the existing person
      }
    },
    removeEmployee: (state, action) => {
      return state.filter((person) => person.id !== action.payload.id); // Remove the person
    },
  },
});

export const { addEmployee, editEmployee, removeEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
