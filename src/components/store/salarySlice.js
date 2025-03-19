import { createSlice } from "@reduxjs/toolkit";

const salarySlice = createSlice({
    name: "salary",
    initialState: {
        salaries: [], // Store multiple salaries
        selectedSalary: null, // Initially null, will be set dynamically
    }, 
    reducers: {
        addSalary: (state, action) => {
            const existingIndex = state.salaries.findIndex(sal => sal._id === action.payload._id);
            if (existingIndex === -1) {
                state.salaries.push(action.payload); // Add new salary if it doesn't exist
            } else {
                state.salaries[existingIndex] = action.payload; // Update if salary already exists
            }
            if (!state.selectedSalary && state.salaries.length > 0) {
                state.selectedSalary = state.salaries.flat()[0];
              }
        },
        updateSalary: (state, action) => {
            const index = state.salaries.findIndex(sal => sal._id === action.payload._id);
            if (index !== -1) {
                state.salaries[index] = { ...state.salaries[index], ...action.payload };
            }
        },
        setSelectedSalary: (state, action)=>{
            state.selectedSalary = action.payload
        }
    }
});

export const { addSalary, updateSalary, setSelectedSalary } = salarySlice.actions;
export default salarySlice.reducer;
