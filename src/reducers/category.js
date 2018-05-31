import * as types from "@/actionTypes/";

const defaultState = {
  goods: []
};
export default (state = defaultState, action) => {
  console.log(state)
  switch (action.type) {
    case types.CATEGORY:
      return { ...state, ...action.categoryInfo };
    default:
      return state;
  }
};
