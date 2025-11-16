import { combineReducers } from 'redux';
import doctorReducer from './slices/doctorSlice';
import ambulanceReducer from './slices/ambulanceSlice';
import commonSlice from './slices/commonSlice';

export default combineReducers({
  doctor: doctorReducer,
  ambulance: ambulanceReducer,
  common: commonSlice,
});
