import { createStore, applyMiddleware } from 'redux';
import createSagaMidlle from 'redux-saga';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import {persistStore} from 'redux-persist';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMidlle();

export const middlewares = [thunk,sagaMiddleWare, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

export default {
    store,
    persistor
};