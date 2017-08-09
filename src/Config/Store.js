import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';

import reducer from '../Reducer/Index';

const composeEnhancers =process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
    }) : compose;

const enhancer = composeEnhancers(
    //你要使用的中间件，放在前面
    // applyMiddleware(thunk,createLogger({level:'log',duration:true}))
    applyMiddleware(thunk)
)


var store=createStore(reducer,enhancer);


export default store;