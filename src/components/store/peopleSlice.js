import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
    name:'people',
    initialState:[],
    reducers:{
        addPeople : (state,action)=>{
            return(action.payload);
    },
    editPeople : (state, action) =>{
        return (action.payload);
    },
    removePeople : (state)=>{
        return null;
    }
}
});

export const {addPeople, editPeople, removePeople} = peopleSlice.actions
export default peopleSlice.reducer