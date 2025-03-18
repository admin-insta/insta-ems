import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [], // Store employees as an array
    selectedEmployee: null, // Initially null, will be set dynamically
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

      // ✅ Set the first employee as selected if none is selected
      if (!state.selectedEmployee && state.employees.length > 0) {
        state.selectedEmployee = state.employees[0];
      }
    },
    setEmployees: (state, action) => {
      if (Array.isArray(action.payload)) {
        // 🔹 Ensure unique employees before setting state
        const uniqueEmployees = Array.from(new Map(action.payload.map(emp => [emp._id, emp])).values());
        state.employees = uniqueEmployees;

        // ✅ Set the first employee as selected if none is selected
        if (!state.selectedEmployee && state.employees.length > 0) {
          state.selectedEmployee = state.employees[0];
        }
      }
    },
    updateEmployee: (state, action) => {
      const updatedUser = action.payload;
      const index = state.employees.findIndex(emp => emp._id === updatedUser._id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...updatedUser };

        // ✅ Ensure the selected employee stays updated
        if (state.selectedEmployee?._id === updatedUser._id) {
          state.selectedEmployee = state.employees[index];
        }
      } else {
        console.error("Employee not found in Redux store!", state.employees, updatedUser);
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp._id !== action.payload._id);

      // ✅ Reset selectedEmployee if removed
      if (state.selectedEmployee?._id === action.payload._id) {
        state.selectedEmployee = state.employees.length > 0 ? state.employees[0] : null;
      }
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload; // Set the selected employee manually
    },
  },
});

export const { addEmployee, updateEmployee, removeEmployee, setEmployees, setSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
