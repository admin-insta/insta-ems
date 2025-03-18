import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [], // Store employees as an array
    selectedEmployee: null, // Store selected employee
  },
  reducers: {
    addEmployee: (state, action) => {
      const newEmployees = Array.isArray(action.payload) ? action.payload : [action.payload];

      // 🔹 Prevent adding duplicate employees
      newEmployees.forEach((newEmp) => {
        if (!state.employees.some((emp) => emp._id === newEmp._id)) {
          state.employees.push(newEmp);
        }
      });
    },
    setEmployees: (state, action) => {
      if (Array.isArray(action.payload)) {
        // 🔹 Ensure unique employees before setting state
        const uniqueEmployees = Array.from(new Map(action.payload.map(emp => [emp._id, emp])).values());
        state.employees = uniqueEmployees;
      }
    },
    updateEmployee: (state, action) => {
      const updatedUser = action.payload;
      const index = state.employees.findIndex(emp => emp._id === updatedUser._id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...updatedUser };
      } else {
        console.error("Employee not found in Redux store!", state.employees, updatedUser);
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp._id !== action.payload._id);
      if (state.selectedEmployee?._id === action.payload._id) {
        state.selectedEmployee = null; // Reset selected employee if removed
      }
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload; // Set the selected employee
    },
  },
});

export const { addEmployee, updateEmployee, removeEmployee, setEmployees, setSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
