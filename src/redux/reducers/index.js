import {combineReducers} from "redux";
import homeReducer from "./home";
import categoryReducer from "./category";
import shopcartReducer from "./shopcart";

export default combineReducers({
    homeInfo: homeReducer,
    categoryInfo: categoryReducer,
    shopcart: shopcartReducer
});
