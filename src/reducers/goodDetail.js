import * as types from "@/actionTypes/";

const defaultState = {};
export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GOODETAIL:
      return Object.assign({},{...state},{...action.goodDetail});
    case types.CHANGEBUYCOUNT:
      return { ...state, count: action.count };
    default:
      return state;
  }
};

