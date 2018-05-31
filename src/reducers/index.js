import { combineReducers } from "redux";
import homeReducer from "./home";
import categoryReducer from "./category";
import goodDetailReducer from './goodDetail'

export default combineReducers({ homeInfo: homeReducer, categoryInfo: categoryReducer,goodDetail:goodDetailReducer });
