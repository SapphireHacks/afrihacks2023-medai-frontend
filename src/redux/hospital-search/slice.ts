import { createSlice } from '@reduxjs/toolkit';

const hospitalSearchSlice = createSlice({
  name: 'hospitalSearch',
  initialState: {
    showHospitalSearch: false
  },
  reducers: {
    setShowHospitalSearch: (state, action) => {
      state.showHospitalSearch = action.payload;
    },
    resetShowHospitalSearch: (state) => {
      state.showHospitalSearch = false
    }
  }
});

export const { setShowHospitalSearch,  resetShowHospitalSearch } = hospitalSearchSlice.actions;

export default hospitalSearchSlice.reducer;
