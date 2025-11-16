import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nearbySearchLoading: false,
  nearbySearchData: null,
  nearbySearchError: null,

  dashboardStatsLoading: false,
  dashboardStatsData: null,
  dashboardStatsError: null,

  seedRecordsLoading: false,
  seedRecordsData: null,
  seedRecordsError: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
     //
    nearbySearchRequest: (state, action) => {
      console.log(action);
      state.nearbySearchLoading = true;
      state.nearbySearchData = null;
      state.nearbySearchError = null;
    },
    nearbySearchSuccess: (state, action) => {
      state.nearbySearchLoading = false;
      state.nearbySearchData = action.payload;
      state.nearbySearchError = null;
      
    },
    nearbySearchFailure: (state, action) => {
      state.nearbySearchLoading = false;
      state.nearbySearchData = null;
      state.nearbySearchError = action.payload;
    },
    nearbySearchClear: (state) => {
      state.nearbySearchLoading = false;
      state.nearbySearchData = null;
      state.nearbySearchError = null;
    },

    //
    dashboardStatsRequest: (state, action) => {
      console.log(action);
      state.dashboardStatsLoading = true;
      state.dashboardStatsData = null;
      state.dashboardStatsError = null;
    },
    dashboardStatsSuccess: (state, action) => {
      state.dashboardStatsLoading = false;
      state.dashboardStatsData = action.payload;
      state.dashboardStatsError = null;
      
    },
    dashboardStatsFailure: (state, action) => {
      state.dashboardStatsLoading = false;
      state.dashboardStatsData = null;
      state.dashboardStatsError = action.payload;
    },
    dashboardStatsClear: (state) => {
      state.dashboardStatsLoading = false;
      state.dashboardStatsData = null;
      state.dashboardStatsError = null;
    },

    //
    seedRecordsRequest: (state) => {
      state.seedRecordsLoading = true;
      state.seedRecordsData = null;
      state.seedRecordsError = null;
    },
    seedRecordsSuccess: (state, action) => {
      state.seedRecordsLoading = false;
      state.seedRecordsData = action.payload;
      state.seedRecordsError = null;
      
    },
    seedRecordsFailure: (state, action) => {
      state.seedRecordsLoading = false;
      state.seedRecordsData = null;
      state.seedRecordsError = action.payload;
    },
    seedRecordsClear: (state) => {
      state.seedRecordsLoading = false;
      state.seedRecordsData = null;
      state.seedRecordsError = null;
    },
  },
});

export const { 
  nearbySearchRequest, nearbySearchSuccess, nearbySearchFailure, nearbySearchClear,
  dashboardStatsRequest, dashboardStatsSuccess, dashboardStatsFailure, dashboardStatsClear,
  seedRecordsRequest, seedRecordsSuccess, seedRecordsFailure, seedRecordsClear,
} = commonSlice.actions;
export default commonSlice.reducer;
