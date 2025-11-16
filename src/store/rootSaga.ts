import { all } from 'redux-saga/effects';
import doctorSaga from './sagas/doctorSaga';
import ambulanceSaga from './sagas/ambulanceSaga';
import commonSaga from './sagas/commonSaga';

export default function* rootSaga() {
  yield all([
    doctorSaga(),
    ambulanceSaga(),
    commonSaga(),
  ]);
}
