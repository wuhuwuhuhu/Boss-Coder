/*
store holds the whole state tree of application
*/
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

//export store object
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk))) 