import {
	WEB3_AUTH_SUCCESS,
	WEB3_AUTH_FAIL,
	SET_UNIBEARS_COUNT,
} from "../constants/constants";

const initialState = {
	address: "",
	unibearsCount: 0,
	errorMessage: "",
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case WEB3_AUTH_SUCCESS:
			return {
				...state,
				address: action.payload.address,
			}
		case WEB3_AUTH_FAIL:
			return {
				...state,
				errorMessage: "Could not authenticate user. Please try again.",
			}
		case SET_UNIBEARS_COUNT: {
			return {
				...state,
				unibearsCount: action.payload.count,
			}
		}
		default:
			return state;
	}
};