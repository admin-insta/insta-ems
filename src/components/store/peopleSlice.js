import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "people",
  initialState: [], // Start with an empty array
  reducers: {
    addPeople: (state, action) => {
      state.push(action.payload); // Add a new person to the array
    },
    editPeople: (state, action) => {
      const index = state.findIndex((person) => person.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update the existing person
      }
    },
    removePeople: (state, action) => {
      return state.filter((person) => person.id !== action.payload.id); // Remove the person
    },
  },
});

export const { addPeople, editPeople, removePeople } = peopleSlice.actions;
export default peopleSlice.reducer;
