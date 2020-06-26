import {cancel, fork, take} from 'redux-saga/effects'
import {watchPhotosActions} from './Photos'

const sagas = [watchPhotosActions]

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR'

function createAbortableSaga(saga) {
    if (process.env.NODE_ENV === 'development') {
        return function* main() {
            const sagaTask = yield fork(saga)
            yield take(CANCEL_SAGAS_HMR)
            yield cancel(sagaTask)
        }
    }
    return saga
}

const SagaManager = {
    startSagas(sagaMiddleware) {
        sagas.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga))
    },
    cancelSaga(store) {
        store.dispatch({type: CANCEL_SAGAS_HMR})
    }
}

export default SagaManager