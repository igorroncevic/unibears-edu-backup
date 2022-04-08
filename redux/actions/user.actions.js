import {
	LANGUAGE_CHANGE
} from "../constants/constants";

export const languageChange = (payload) => (dispatch) => {
	return dispatch({ type: LANGUAGE_CHANGE, payload });
}