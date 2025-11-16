import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  getDoctorsRequest, getDoctorsSuccess, getDoctorsFailure,
  getDoctorByIdRequest, getDoctorByIdSuccess, getDoctorByIdFailure,
  addDoctorRequest, addDoctorSuccess, addDoctorFailure,
  updateDoctorRequest, updateDoctorSuccess, updateDoctorFailure,
  deleteDoctorRequest, deleteDoctorSuccess, deleteDoctorFailure,
} from '../slices/doctorSlice';
import DoctorService from '../../services/DoctorService';

function* handleGetDoctors(action: any): Generator<any, void, any> {
  try {
    const response = yield call(DoctorService.getDoctors, action.payload);
    console.log('--handleGetDoctors--',response);
    if (!response.success) {
      yield put(getDoctorsFailure(response));
    } else {
      yield put(getDoctorsSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(getDoctorsFailure(error));
  }
}

function* handleGetDoctorById(action: any): Generator<any, void, any> {
  try {
    const response = yield call(DoctorService.getDoctorById, action.payload);
    console.log('--handleGetDoctorById--',response);
    if (!response.success) {
      yield put(getDoctorByIdFailure(response));
    } else {
      yield put(getDoctorByIdSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(getDoctorByIdFailure(error));
  }
}


function* handleAddDoctor(action: any): Generator<any, void, any> {
  try {
    const response = yield call(DoctorService.addDoctor, action.payload);
    console.log('--handleAddDoctor--',response);
    if (!response.success) {
      yield put(addDoctorFailure(response));
    } else {
      yield put(addDoctorSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(addDoctorFailure(error));
  }
}

function* handleUpdateDoctor(action: any): Generator<any, void, any> {
  try {
    const response = yield call(DoctorService.updateDoctor, action.payload);
    console.log('--handleUpdateDoctor--',response);
    if (!response.success) {
      yield put(updateDoctorFailure(response));
    } else {
      yield put(updateDoctorSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(updateDoctorFailure(error));
  }
}

function* handleDeleteDoctor(action: any): Generator<any, void, any> {
  try {
    const response = yield call(DoctorService.deleteDoctor, action.payload);
    console.log('--handleDeleteDoctor--',response);
    if (!response.success) {
      yield put(deleteDoctorFailure(response));
    } else {
      yield put(deleteDoctorSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(deleteDoctorFailure(error));
  }
}

export default function* doctorSaga() {
  yield takeLatest(getDoctorsRequest.type, handleGetDoctors);
  yield takeLatest(getDoctorByIdRequest.type, handleGetDoctorById);
  yield takeLatest(addDoctorRequest.type, handleAddDoctor);
  yield takeLatest(updateDoctorRequest.type, handleUpdateDoctor);
  yield takeLatest(deleteDoctorRequest.type, handleDeleteDoctor);
}
