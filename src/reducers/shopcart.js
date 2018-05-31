import * as types from "@/actionTypes/";

const defaultState = [];

export default (state = defaultState, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case types.SHOPCART:
      return [...state, action.shopList];
    default:
      return state;
  }
};
