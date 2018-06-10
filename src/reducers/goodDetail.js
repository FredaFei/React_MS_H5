import * as types from "@/actionTypes/";

const defaultState = {
  goodDetails: {},
  showToast: false,
};
export default (state = defaultState, action) => {
  let {goodDetails,showToast} = state
  switch (action.type) {
    case types.GOODETAIL:
      return Object.assign({},{...state},{goodDetails: action.goodDetails},{showToast: !showToast})
    case types.CHANGEBUYCOUNT:
      return { ...state, count: action.count };
    case types.TOGGLEDETAIL:
      return { ...state, showToast: !showToast };
    default:
      return state;
  }
};
