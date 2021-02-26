import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-starter-kit';
import sagas from '../sagas';
//import reducers from './reducers';
import weatherReducer from '../Features/Weather/weatherReducer';
import metricNamesReducer from '../Features/Weather/metricNames';
import heartBeatReducer from '../Features/Weather/heartBeat';

// const reducer = combineReducers(reducers);
// export type IState = ReturnType<typeof reducer>;

export default () => {
    //const rootReducer = combineReducers(reducers);
    const rootReducer = combineReducers({
        weather: weatherReducer,
        metricNames: metricNamesReducer,
        heartBeat: heartBeatReducer
    });

    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));

    //sagaMiddleware.run(sagas);
    sagas.forEach(sagaMiddleware.run);

    return store;
};