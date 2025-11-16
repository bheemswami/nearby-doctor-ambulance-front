import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  nearbySearchRequest, nearbySearchSuccess, nearbySearchFailure,
  dashboardStatsRequest, dashboardStatsSuccess, dashboardStatsFailure,
  seedRecordsRequest, seedRecordsSuccess, seedRecordsFailure,
} from '../slices/commonSlice';
import CommonService from '../../services/CommonService';

function* handleNearbySearch(action: any): Generator<any, void, any> {
  try {
    const response = yield call(CommonService.nearbySearch, action.payload);
    console.log('--handlenearbySearch--',response);
    if (!response.success) {
      yield put(nearbySearchFailure(response));
    } else {
      yield put(nearbySearchSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(nearbySearchFailure(error));
  }
}

function* handleDashboardStats(action: any): Generator<any, void, any> {
  try {
    const response = yield call(CommonService.dashboardStats, action.payload);
    console.log('--handleDashboardStats--',response);
    if (!response.success) {
      yield put(dashboardStatsFailure(response));
    } else {
      yield put(dashboardStatsSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(dashboardStatsFailure(error));
  }
}

function* handleSeedRecords(action: any): Generator<any, void, any> {
  try {
    const response = yield call(CommonService.seedRecords, action.payload);
    console.log('--handleSeedRecords--',response);
    if (!response.success) {
      yield put(seedRecordsFailure(response));
    } else {
      yield put(seedRecordsSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(seedRecordsFailure(error));
  }
}

export default function* commonSaga() {
  yield takeLatest(nearbySearchRequest.type, handleNearbySearch);
  yield takeLatest(dashboardStatsRequest.type, handleDashboardStats);
  yield takeLatest(seedRecordsRequest.type, handleSeedRecords);
}
