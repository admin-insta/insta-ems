import { createSlice } from "@reduxjs/toolkit";
const leaveSlice = createSlice({
    name:"leave",
    initialState:{
        leaves:[]
    },
    reducers:{
        setLeaves: (state, action)=>{
            state.leaves = action.payload
        },
        addLeaves: (state, action) => {
            state.leaves.unshift(action.payload); // add to beginning of array
          },
        updateLeaves: (state, action) => {
            const updated = action.payload;
            const index = state.leaves.findIndex(
              (leave) => leave._id === updated._id
            );
            if (index !== -1) {
              state.leaves[index] = {
                ...state.leaves[index],
                ...updated,
              };
            }
          }
    }
})
export const{setLeaves, updateLeaves, addLeaves} = leaveSlice.actions
export default leaveSlice.reducer