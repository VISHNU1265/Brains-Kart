import {applyMiddleware,createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";
import rootReducer from "./rootReducer";

let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,thunk)));

export default store;