import {
	WEB3_AUTH_SUCCESS,
	WEB3_AUTH_FAIL,
	SET_UNIBEARS_COUNT
} from "../constants/constants";

export const authSuccess = (payload) => (dispatch) => {
	return dispatch({ type: WEB3_AUTH_SUCCESS, payload });
}

export const authFail = (payload) => (dispatch) => {
	return dispatch({ type: WEB3_AUTH_FAIL, payload });
}

export const setUnibearsCount = (payload) => async (dispatch) => {
	return dispatch({ type: SET_UNIBEARS_COUNT, payload });
}
