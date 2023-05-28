import handleCart from "./handleCart";
import { combineReducers } from "redux";

// Combine the handleCart reducer with other reducers if needed
const rootReducers = combineReducers({
    handleCart,
});

export default rootReducers;
