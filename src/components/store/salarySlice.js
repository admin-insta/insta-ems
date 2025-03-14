import { createSlice } from "@reduxjs/toolkit";

const salarySlice = createSlice({
    name:"salary",
    initialState:[],
    reducers:{
        addSalary : (state, action)=>{
            return{...action.payload}
        }
    }
});

export const {addSalary}= salarySlice.actions
export default salarySlice.reducer