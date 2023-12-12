import { createSlice } from '@reduxjs/toolkit';

const hospitalSearchSlice = createSlice({
  name: 'hospitalSearch',
  initialState: {
    showHospitalSearch: false
  },
  reducers: {
    setShowHospitalSearch: (state, action) => {
      state.showHospitalSearch = action.payload;
    }
  }
});

export const { setShowHospitalSearch } = hospitalSearchSlice.actions;

export default hospitalSearchSlice.reducer;
