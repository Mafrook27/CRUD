import { SET_SHOW_FORM , SET_SEARCH_ID} from "./actionType";

export const setShowForm = (show) => ({
  type: SET_SHOW_FORM,
  payload: show,
});


export const setSearchId = (searchId) => ({
  type: SET_SEARCH_ID,
  payload: searchId,
});