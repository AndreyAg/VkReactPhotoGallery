import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import SagaManager from '../sagas'

export default function configureStore(initialState) {

    const logger = createLogger()
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware, logger)
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
        module.hot.accept('../sagas', () => {
            SagaManager.cancelSaga(store)
            require('../sagas').default.startSagas(sagaMiddleware)
        })
    }

    SagaManager.startSagas(sagaMiddleware)

    return store
}