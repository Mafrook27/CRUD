import { combineReducers } from "redux";
import showReducer from "./reducer"; 
const rootReducer = combineReducers({
  post: showReducer,
});

export default rootReducer;
