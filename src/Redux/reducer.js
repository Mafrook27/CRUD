
import { SET_SHOW_FORM, SET_SEARCH_ID } from "./actionType";

const initialState = {
  showForm: false,
  searchId: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_FORM:
      return { ...state, showForm: action.payload };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload };
    default:
      return state;
  }
};

export default reducer;
