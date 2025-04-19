import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    selectedEmployee: null,
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
  },
  reducers: {
    addEmployee: (state, action) => {
      const newEmployees = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      newEmployees.forEach((newEmp) => {
        if (!state.employees.some((emp) => emp._id === newEmp._id)) {
          state.employees.push(newEmp);
        }
      });

      if (!state.selectedEmployee && state.employees.length > 0) {
        state.selectedEmployee = state.employees[0];
      }
    },

    setEmployees: (state, action) => {
      if (Array.isArray(action.payload)) {
        const uniqueEmployees = Array.from(
          new Map(action.payload.map((emp) => [emp._id, emp])).values()
        );
        state.employees = uniqueEmployees;

        if (!state.selectedEmployee && state.employees.length > 0) {
          state.selectedEmployee = state.employees[0];
        }
      }
    },

    updateEmployee: (state, action) => {
      const updatedUser = action.payload;
      const index = state.employees.findIndex(
        (emp) => emp._id === updatedUser._id
      );
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedUser,
        };

        if (state.selectedEmployee?._id === updatedUser._id) {
          state.selectedEmployee = state.employees[index];
        }
      } else {
        console.error("Employee not found in Redux store!", updatedUser);
      }
    },

    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp._id !== action.payload._id
      );

      if (state.selectedEmployee?._id === action.payload._id) {
        state.selectedEmployee =
          state.employees.length > 0 ? state.employees[0] : null;
      }
    },

    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },

    // 🔽 New reducers for pagination support
    setPagination: (state, action) => {
      const { currentPage, totalPages, totalEmployees } = action.payload;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
      state.totalEmployees = totalEmployees;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  removeEmployee,
  setEmployees,
  setSelectedEmployee,
  setPagination,
  setCurrentPage,
} = employeeSlice.actions;

export default employeeSlice.reducer;
