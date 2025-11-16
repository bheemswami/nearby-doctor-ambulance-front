import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  getAmbulancesRequest, getAmbulancesSuccess, getAmbulancesFailure,
  getAmbulanceByIdRequest, getAmbulanceByIdSuccess, getAmbulanceByIdFailure,
  addAmbulanceRequest, addAmbulanceSuccess, addAmbulanceFailure,
  updateAmbulanceRequest, updateAmbulanceSuccess, updateAmbulanceFailure,
  deleteAmbulanceRequest, deleteAmbulanceSuccess, deleteAmbulanceFailure,
} from '../slices/ambulanceSlice';
import AmbulanceService from '../../services/AmbulanceService';

function* handleGetAmbulances(action: any): Generator<any, void, any> {
  try {
    const response = yield call(AmbulanceService.getAmbulances, action.payload);
    console.log('--handleGetAmbulances--',response);
    if (!response.success) {
      yield put(getAmbulancesFailure(response));
    } else {
      yield put(getAmbulancesSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(getAmbulancesFailure(error));
  }
}

function* handleGetAmbulanceById(action: any): Generator<any, void, any> {
  try {
    const response = yield call(AmbulanceService.getAmbulanceById, action.payload);
    console.log('--handleGetAmbulanceById--',response);
    if (!response.success) {
      yield put(getAmbulanceByIdFailure(response));
    } else {
      yield put(getAmbulanceByIdSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(getAmbulanceByIdFailure(error));
  }
}


function* handleAddAmbulance(action: any): Generator<any, void, any> {
  try {
    const response = yield call(AmbulanceService.addAmbulance, action.payload);
    console.log('--handleAddAmbulance--',response);
    if (!response.success) {
      yield put(addAmbulanceFailure(response));
    } else {
      yield put(addAmbulanceSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(addAmbulanceFailure(error));
  }
}

function* handleUpdateAmbulance(action: any): Generator<any, void, any> {
  try {
    const response = yield call(AmbulanceService.updateAmbulance, action.payload);
    console.log('--handleUpdateAmbulance--',response);
    if (!response.success) {
      yield put(updateAmbulanceFailure(response));
    } else {
      yield put(updateAmbulanceSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(updateAmbulanceFailure(error));
  }
}

function* handleDeleteAmbulance(action: any): Generator<any, void, any> {
  try {
    const response = yield call(AmbulanceService.deleteAmbulance, action.payload);
    console.log('--handleDeleteAmbulance--',response);
    if (!response.success) {
      yield put(deleteAmbulanceFailure(response));
    } else {
      yield put(deleteAmbulanceSuccess(response.data));
    }
  } catch (error) {
     console.log(error);
    yield put(deleteAmbulanceFailure(error));
  }
}

export default function* ambulanceSaga() {
  yield takeLatest(getAmbulancesRequest.type, handleGetAmbulances);
  yield takeLatest(getAmbulanceByIdRequest.type, handleGetAmbulanceById);
  yield takeLatest(getAmbulanceByIdRequest.type, handleGetAmbulanceById);
  yield takeLatest(addAmbulanceRequest.type, handleAddAmbulance);
  yield takeLatest(updateAmbulanceRequest.type, handleUpdateAmbulance);
  yield takeLatest(deleteAmbulanceRequest.type, handleDeleteAmbulance);
}
