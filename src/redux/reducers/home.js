import * as types from "../actionTypes/";

const defaultState = {
  hotGoods: [],
  classGoods: [],
  recommendGoods: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GETHOME:
      return { ...state, ...action.homeInfo };
    default:
      return state;
  }
};
