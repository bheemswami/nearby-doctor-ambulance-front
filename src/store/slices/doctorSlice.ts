import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getDoctorsLoading: false,
  getDoctorsData: null,
  getDoctorsError: null,

  getDoctorByIdLoading: false,
  getDoctorByIdData: null,
  getDoctorByIdError: null,

  addDoctorLoading: false,
  addDoctorData: null,
  addDoctorError: null,

  updateDoctorLoading: false,
  updateDoctorData: null,
  updateDoctorError: null,

  deleteDoctorLoading: false,
  deleteDoctorData: null,
  deleteDoctorError: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
     //
    getDoctorsRequest: (state, action) => {
      console.log(action);
      state.getDoctorsLoading = true;
      state.getDoctorsData = null;
      state.getDoctorsError = null;
    },
    getDoctorsSuccess: (state, action) => {
      state.getDoctorsLoading = false;
      state.getDoctorsData = action.payload;
      state.getDoctorsError = null;
      
    },
    getDoctorsFailure: (state, action) => {
      state.getDoctorsLoading = false;
      state.getDoctorsData = null;
      state.getDoctorsError = action.payload;
    },
    getDoctorsClear: (state) => {
      state.getDoctorsLoading = false;
      state.getDoctorsData = null;
      state.getDoctorsError = null;
    },

    //
    getDoctorByIdRequest: (state, action) => {
      console.log(action);
      state.getDoctorByIdLoading = true;
      state.getDoctorByIdData = null;
      state.getDoctorByIdError = null;
    },
    getDoctorByIdSuccess: (state, action) => {
      state.getDoctorByIdLoading = false;
      state.getDoctorByIdData = action.payload;
      state.getDoctorByIdError = null;
      
    },
    getDoctorByIdFailure: (state, action) => {
      state.getDoctorByIdLoading = false;
      state.getDoctorByIdData = null;
      state.getDoctorByIdError = action.payload;
    },
    getDoctorByIdClear: (state) => {
      state.getDoctorByIdLoading = false;
      state.getDoctorByIdData = null;
      state.getDoctorByIdError = null;
    },

    //
    addDoctorRequest: (state, action) => {
      console.log(action);
      state.addDoctorLoading = true;
      state.addDoctorData = null;
      state.addDoctorError = null;
    },
    addDoctorSuccess: (state, action) => {
      state.addDoctorLoading = false;
      state.addDoctorData = action.payload;
    },
    addDoctorFailure: (state, action) => {
      state.addDoctorLoading = false;
      state.addDoctorError = action.payload;
    },
    addDoctorClear(state) {
      state.addDoctorLoading = false;
      state.addDoctorData = null;
      state.addDoctorError = null;
    },

    //
    updateDoctorRequest: (state, action) => {
      console.log(action);
      state.updateDoctorLoading = true;
      state.updateDoctorData = null;
      state.updateDoctorError = null;
    },
    updateDoctorSuccess: (state, action) => {
      state.updateDoctorLoading = false;
      state.updateDoctorData = action.payload;
    },
    updateDoctorFailure: (state, action) => {
      state.updateDoctorLoading = false;
      state.updateDoctorError = action.payload;
    },
    updateDoctorClear(state) {
      state.updateDoctorLoading = false;
      state.updateDoctorData = null;
      state.updateDoctorError = null;
    },

    //
    deleteDoctorRequest: (state, action) => {
      console.log(action);
      state.deleteDoctorLoading = true;
      state.deleteDoctorData = null;
      state.deleteDoctorError = null;
    },
    deleteDoctorSuccess: (state, action) => {
      state.deleteDoctorLoading = false;
      state.deleteDoctorData = action.payload;
    },
    deleteDoctorFailure: (state, action) => {
      state.deleteDoctorLoading = false;
      state.deleteDoctorError = action.payload;
    },
    deleteDoctorClear(state) {
      state.deleteDoctorLoading = false;
      state.deleteDoctorData = null;
      state.deleteDoctorError = null;
    },
  },
});

export const { 
  getDoctorsRequest, getDoctorsSuccess, getDoctorsFailure, getDoctorsClear,
  getDoctorByIdRequest, getDoctorByIdSuccess, getDoctorByIdFailure, getDoctorByIdClear,
  addDoctorRequest, addDoctorSuccess, addDoctorFailure, addDoctorClear,
  updateDoctorRequest, updateDoctorSuccess, updateDoctorFailure, updateDoctorClear,
  deleteDoctorRequest, deleteDoctorSuccess, deleteDoctorFailure, deleteDoctorClear,
  
} = doctorSlice.actions;
export default doctorSlice.reducer;
