import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getAmbulancesLoading: false,
  getAmbulancesData: null,
  getAmbulancesError: null,

  getAmbulanceByIdLoading: false,
  getAmbulanceByIdData: null,
  getAmbulanceByIdError: null,

  addAmbulanceLoading: false,
  addAmbulanceData: null,
  addAmbulanceError: null,

  updateAmbulanceLoading: false,
  updateAmbulanceData: null,
  updateAmbulanceError: null,

  deleteAmbulanceLoading: false,
  deleteAmbulanceData: null,
  deleteAmbulanceError: null,
};

const ambulanceSlice = createSlice({
  name: 'ambulance',
  initialState,
  reducers: {
     //
    getAmbulancesRequest: (state, action) => {
      console.log(action);
      state.getAmbulancesLoading = true;
      state.getAmbulancesData = null;
      state.getAmbulancesError = null;
    },
    getAmbulancesSuccess: (state, action) => {
      state.getAmbulancesLoading = false;
      state.getAmbulancesData = action.payload;
      state.getAmbulancesError = null;
      
    },
    getAmbulancesFailure: (state, action) => {
      state.getAmbulancesLoading = false;
      state.getAmbulancesData = null;
      state.getAmbulancesError = action.payload;
    },
    getAmbulancesClear: (state) => {
      state.getAmbulancesLoading = false;
      state.getAmbulancesData = null;
      state.getAmbulancesError = null;
    },

    //
    getAmbulanceByIdRequest: (state, action) => {
      console.log(action);
      state.getAmbulanceByIdLoading = true;
      state.getAmbulanceByIdData = null;
      state.getAmbulanceByIdError = null;
    },
    getAmbulanceByIdSuccess: (state, action) => {
      state.getAmbulanceByIdLoading = false;
      state.getAmbulanceByIdData = action.payload;
      state.getAmbulanceByIdError = null;
      
    },
    getAmbulanceByIdFailure: (state, action) => {
      state.getAmbulanceByIdLoading = false;
      state.getAmbulanceByIdData = null;
      state.getAmbulanceByIdError = action.payload;
    },
    getAmbulanceByIdClear: (state) => {
      state.getAmbulanceByIdLoading = false;
      state.getAmbulanceByIdData = null;
      state.getAmbulanceByIdError = null;
    },

    //
    addAmbulanceRequest: (state, action) => {
      console.log(action);
      state.addAmbulanceLoading = true;
      state.addAmbulanceData = null;
      state.addAmbulanceError = null;
    },
    addAmbulanceSuccess: (state, action) => {
      state.addAmbulanceLoading = false;
      state.addAmbulanceData = action.payload;
    },
    addAmbulanceFailure: (state, action) => {
      state.addAmbulanceLoading = false;
      state.addAmbulanceError = action.payload;
    },
    addAmbulanceClear(state) {
      state.addAmbulanceLoading = false;
      state.addAmbulanceData = null;
      state.addAmbulanceError = null;
    },

    //
    updateAmbulanceRequest: (state, action) => {
      console.log(action);
      state.updateAmbulanceLoading = true;
      state.updateAmbulanceData = null;
      state.updateAmbulanceError = null;
    },
    updateAmbulanceSuccess: (state, action) => {
      state.updateAmbulanceLoading = false;
      state.updateAmbulanceData = action.payload;
    },
    updateAmbulanceFailure: (state, action) => {
      state.updateAmbulanceLoading = false;
      state.updateAmbulanceError = action.payload;
    },
    updateAmbulanceClear(state) {
      state.updateAmbulanceLoading = false;
      state.updateAmbulanceData = null;
      state.updateAmbulanceError = null;
    },

    //
    deleteAmbulanceRequest: (state, action) => {
      console.log(action);
      state.deleteAmbulanceLoading = true;
      state.deleteAmbulanceData = null;
      state.deleteAmbulanceError = null;
    },
    deleteAmbulanceSuccess: (state, action) => {
      state.deleteAmbulanceLoading = false;
      state.deleteAmbulanceData = action.payload;
    },
    deleteAmbulanceFailure: (state, action) => {
      state.deleteAmbulanceLoading = false;
      state.deleteAmbulanceError = action.payload;
    },
    deleteAmbulanceClear(state) {
      state.deleteAmbulanceLoading = false;
      state.deleteAmbulanceData = null;
      state.deleteAmbulanceError = null;
    },
  },
});

export const { 
  getAmbulancesRequest, getAmbulancesSuccess, getAmbulancesFailure, getAmbulancesClear,
  getAmbulanceByIdRequest, getAmbulanceByIdSuccess, getAmbulanceByIdFailure, getAmbulanceByIdClear,
  addAmbulanceRequest, addAmbulanceSuccess, addAmbulanceFailure, addAmbulanceClear,
  updateAmbulanceRequest, updateAmbulanceSuccess, updateAmbulanceFailure, updateAmbulanceClear,
  deleteAmbulanceRequest, deleteAmbulanceSuccess, deleteAmbulanceFailure, deleteAmbulanceClear,
  
} = ambulanceSlice.actions;
export default ambulanceSlice.reducer;
