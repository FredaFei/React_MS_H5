import * as types from "../actionTypes/";

const defaultState = {};
export default (state = defaultState, action) => {
    switch (action.type) {
        case types.CATEGORY:
            return {...state, ...action.categoryInfo};
        case types.ADDSHOPCART:
            return {...state};
        default:
            return state;
    }
};
