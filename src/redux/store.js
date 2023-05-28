import { applyMiddleware, createStore, combineReducers } from "redux";
import rootReducers from "./reducer";
import { saveCartToCookie } from "./reducer/handleCart";
import thunk from 'redux-thunk';

// Create the Redux store with the rootReducers, applying middleware and enhancers
const store = createStore(
    rootReducers,
    applyMiddleware(thunk, saveCartToCookie)
);

export default store;
