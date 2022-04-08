import {
	LANGUAGE_CHANGE
} from "../constants/constants";

const initialState = {
	langCode: "sr",
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LANGUAGE_CHANGE:
			return {
				...state,
				langCode: action.payload.language,
			};
		default:
			return state;
	}
};
