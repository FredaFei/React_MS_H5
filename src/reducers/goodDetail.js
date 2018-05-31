import * as types from "@/actionTypes/";

const defaultState = {};
export default (state = defaultState, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case types.GOODETAIL:
      return Object.assign({},{...state},{...action.goodDetail});
    case types.CHANGEBUYCOUNT:
      console.log(...state)
      return { ...state, count: action.count };
    default:
      return state;
  }
};

